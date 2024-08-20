<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let svgElement: SVGSVGElement | null = null;

	interface Node {
		id: string;
		x?: number;
		y?: number;
		fx?: number | null;
		fy?: number | null;
		vx?: number;
		vy?: number;
	}

	interface Link {
		source: string;
		target: string;
		value?: number;
	}

	const nodes: Node[] = [
		{ id: 'A', vx: Math.random() * 2 - 1, vy: Math.random() * 2 - 1 },
		{ id: 'B', vx: Math.random() * 2 - 1, vy: Math.random() * 2 - 1 },
		{ id: 'C', vx: Math.random() * 2 - 1, vy: Math.random() * 2 - 1 },
	];

	const links: Link[] = [
		{ source: 'A', target: 'B' },
		{ source: 'A', target: 'C' },
		{ source: 'B', target: 'C' },
	];

	let width = 1;
	let height = 1;

	let simulation: d3.Simulation<Node, Link>;

	function initializeSimulation() {
		simulation = d3
			.forceSimulation(nodes)
			.velocityDecay(0.6)
			.force(
				'link',
				d3
					.forceLink(links)
					.id((d: Node) => d.id)
					.distance(100)
			)
			.force('charge', d3.forceManyBody().strength(-300))
			.force('center', d3.forceCenter(width / 2, height / 2))
			.alphaDecay(0.05)
			.alphaTarget(0.2);
	}

	function dragHandlers(simulation: d3.Simulation<Node, Link>) {
		function dragstarted(event: d3.D3DragEvent<SVGElement, Node, Node>, d: Node) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
			d.vx = 0;
			d.vy = 0;
		}

		function dragged(event: d3.D3DragEvent<SVGElement, Node, Node>, d: Node) {
			d.fx = event.x;
			d.fy = event.y;
		}

		function dragended(event: d3.D3DragEvent<SVGElement, Node, Node>, d: Node) {
			if (!event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
			d.vx = Math.random() * 2 - 1;
			d.vy = Math.random() * 2 - 1;
		}

		return d3
			.drag<SVGElement, Node>()
			.on('start', dragstarted)
			.on('drag', dragged)
			.on('end', dragended);
	}

	function createGridDots(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) {
		const gridDots = svg.append('g').attr('class', 'grid-dots');
		for (let x = 0; x <= width; x += 20) {
			for (let y = 0; y <= height; y += 20) {
				gridDots
					.append('circle')
					.attr('cx', x)
					.attr('cy', y)
					.attr('r', 0.6)
					.attr('fill', '#41445a');
			}
		}
	}

	function createLinks(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) {
		return svg
			.append('g')
			.attr('stroke', '#41445a')
			.attr('stroke-opacity', 0.6)
			.selectAll('line')
			.data(links)
			.join('line')
			.attr('stroke-width', (d: Link) => Math.sqrt(d.value || 1));
	}

	function createNodes(svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, link: d3.Selection<SVGGElement, Link, SVGGElement, unknown>) {
		const node = svg
			.append('g')
			.attr('stroke', '#41445a')
			.attr('stroke-width', 1.5)
			.selectAll('g')
			.data(nodes)
			.join('g')
			.call(dragHandlers(simulation));

		node.append('circle').attr('r', 10).attr('fill', '#ffffff');

		node
			.append('text')
			.attr('x', 0)
			.attr('y', 28)
			.attr('fill', '#41445a')
			.attr('text-anchor', 'middle')
			.text((d: Node) => d.id);

		if (VITE_DEV) {
			node
				.append('line')
				.attr('stroke', 'red')
				.attr('stroke-width', 2)
				.attr('x1', 0)
				.attr('y1', 0)
				.attr('x2', (d) => (d.vx ? d.vx * 10 : 0))
				.attr('y2', (d) => (d.vy ? d.vy * 10 : 0));

			node
				.append('circle')
				.attr('stroke', 'red')
				.attr('stroke-opacity', 0.15)
				.attr('stroke-width', 1)
				.attr('r', 100)
				.attr('fill', 'none');
		}

		simulation.on('tick', () => {
			link
				.attr('x1', (d: Link) => (d.source as unknown as Node).x ?? 0)
				.attr('y1', (d: Link) => (d.source as unknown as Node).y ?? 0)
				.attr('x2', (d: Link) => (d.target as unknown as Node).x ?? 0)
				.attr('y2', (d: Link) => (d.target as unknown as Node).y ?? 0);

			node.attr('transform', (d: Node) => `translate(${d.x ?? 0},${d.y ?? 0})`);

			node.selectAll('line')
				.attr('x2', (d) => (d.vx ? d.vx * 10 : 0))
				.attr('y2', (d) => (d.vy ? d.vy * 10 : 0));
		});
	}

	function initializeSvg() {
		if (!svgElement) return;

		const svg = d3
			.select(svgElement)
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('viewBox', `0 0 ${width} ${height}`)
			.attr('preserveAspectRatio', 'xMidYMid meet');

		createGridDots(svg);

		const zoom = d3.zoom().scaleExtent([0.5, 32]).interpolate(d3.interpolate).on('zoom', zoomed);
		svg.call(zoom);

		const link = createLinks(svg);
		createNodes(svg, link);

		function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
			svg
				.selectAll('g')
				.filter((_, i) => i < 3)
				.attr('transform', event.transform);
		}

		function handleResize() {
			width = window.innerWidth;
			height = window.innerHeight;

			svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '100%');

			simulation.force('center', d3.forceCenter(width / 2, height / 2));
		}

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}

	onMount(() => {
		width = window.innerWidth;
		height = window.innerHeight;

		initializeSimulation();
		initializeSvg();
	});
</script>

<svg bind:this={svgElement}></svg>

<style>
	svg {
		background: #ffffff;
	}
</style>
