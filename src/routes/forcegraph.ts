import * as d3 from 'd3';
import type * as nodetypes from './nodetypes';

export function createChart(svg: SVGSVGElement | null, data: nodetypes.File): void {
    if (!svg) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const color = d3.scaleOrdinal<string>(d3.schemeCategory10);

    const links: nodetypes.Link[] = data.links.map((d) => ({ ...d }));
    const nodes: nodetypes.Node[] = data.nodes.map((d) => ({
        ...d,
        x: Math.random() * width,
        y: Math.random() * height
    }));

    const simulation = d3
        .forceSimulation<nodetypes.Node>(nodes)
        .force(
            'link',
            d3.forceLink<nodetypes.Node, nodetypes.Link>(links).id((d) => d.id)
        )
        .force('charge', d3.forceManyBody().strength(-100))
        .force('x', d3.forceX(width / 2).strength(0.1))
        .force('y', d3.forceY(height / 2).strength(0.1));

    const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .extent([
            [0, 0],
            [width, height]
        ])
        .scaleExtent([0.1, 10])
        .on('zoom', (event) => {
            zoomed(event);
            requestAnimationFrame(interpolateTransform);
        });

    const svgElement = d3.select(svg).attr('width', width).attr('height', height);

    svgElement.call(zoom);

    // Create a group element to contain links and nodes
    const mainGroup = svgElement.append('g');

    const link = mainGroup
        .selectAll<SVGLineElement, nodetypes.Link>('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke-width', (d) => Math.sqrt(d.value))
        .attr('stroke', 'black')
        .attr('class', 'stroke-[0.6px] stroke-surface-400 dark:stroke-surface-300');

    const node = mainGroup
        .selectAll<SVGGElement, nodetypes.Node>('.node')
        .data(nodes)
        .enter()
        .append('a')
        .attr('class', 'node fill-surface-50 dark:fill-surface-900 hover:fill-surface-00 dark:hover:fill-surface-700 stroke-[#41445a] dark:stroke-[#E3E3E6] hover:fill-[#D8D9DD] dark:hover:fill-[#20212C] hover:stroke-[#41445a] dark:hover:stroke-[#E3E3E6]')
        .attr('target', '_blank')
        .append('circle')
        .attr('r', 5);

    node.append('title').text((d) => d.id);

    node.call(dragHandlers());

    simulation.on('tick', () => {
        link
            .attr('x1', (d) => d.source.x)
            .attr('y1', (d) => d.source.y)
            .attr('x2', (d) => d.target.x)
            .attr('y2', (d) => d.target.y);

        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    });

    let mainTransform = d3.zoomIdentity;
    let targetTransform = d3.zoomIdentity;
    const lerpFactor = 0.01; // Adjust this value to control the speed of interpolation

    function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, unknown>): void {
        // Set the target transform based on the zoom event
        targetTransform = event.transform;
    }

    // Function to update the current transform towards the target transform
    function interpolateTransform() {
        // Linearly interpolate between the current and target transform
        mainTransform = d3.zoomIdentity
            .translate(
                lerp(mainTransform.x, targetTransform.x, lerpFactor),
                lerp(mainTransform.y, targetTransform.y, lerpFactor)
            )
            .scale(lerp(mainTransform.k, targetTransform.k, lerpFactor));
        
        // Apply the interpolated transform to the main group
        mainGroup.attr('transform', mainTransform);

        // Continue the interpolation if we haven't reached the target
        if (!transformIsClose(mainTransform, targetTransform)) {
            requestAnimationFrame(interpolateTransform);
        }
    }

    // Helper function for linear interpolation
    function lerp(start: number, end: number, factor: number): number {
        return start + (end - start) * factor;
    }

    // Helper function to check if the transform is close enough to the target
    function transformIsClose(a: d3.ZoomTransform, b: d3.ZoomTransform, threshold = 0.01): boolean {
        return Math.abs(a.x - b.x) < threshold &&
               Math.abs(a.y - b.y) < threshold &&
               Math.abs(a.k - b.k) < threshold;
    }

    function dragHandlers() {
        return d3
            .drag<SVGCircleElement, nodetypes.Node>()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }

    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, nodetypes.Node, SVGCircleElement>) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, nodetypes.Node, SVGCircleElement>) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, nodetypes.Node, SVGCircleElement>) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }
}
