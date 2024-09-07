import * as d3 from 'd3';
import type * as nodetypes from '../types/nodetypes';

export function setupSimulation(
	nodes: nodetypes.Node[],
	links: nodetypes.Link[],
	width: number,
	height: number
) {
	return d3
		.forceSimulation<nodetypes.Node>(nodes)
		.force(
			'link',
			d3.forceLink<nodetypes.Node, nodetypes.Link>(links).id((d) => d.id)
		)
		.force('charge', d3.forceManyBody().strength(-100))
		.force('x', d3.forceX(width / 2).strength(0.1))
		.force('y', d3.forceY(height / 2).strength(0.1));
}

export function setupSimulationUpdate(
	simulation: d3.Simulation<nodetypes.Node, undefined>,
	link: d3.Selection<SVGLineElement, nodetypes.Link, SVGGElement, unknown>,
	node: d3.Selection<SVGCircleElement, nodetypes.Node, SVGGElement, unknown>
) {
	simulation.on('tick', () => {
		link
			.attr('x1', (d) => d.source.x)
			.attr('y1', (d) => d.source.y)
			.attr('x2', (d) => d.target.x)
			.attr('y2', (d) => d.target.y);

		node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
	});
}
