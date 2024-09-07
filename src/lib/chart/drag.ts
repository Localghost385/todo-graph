import * as d3 from 'd3';
import type * as nodetypes from '../types/nodetypes';

export function setupDrag(simulation: d3.Simulation<nodetypes.Node, undefined>) {
	return d3
		.drag<SVGCircleElement, nodetypes.Node>()
		.on('start', (event) => dragstarted(event, simulation))
		.on('drag', dragged)
		.on('end', (event) => dragended(event, simulation));
}

function dragstarted(
	event: d3.D3DragEvent<SVGCircleElement, nodetypes.Node, SVGCircleElement>,
	simulation: d3.Simulation<nodetypes.Node, undefined>
) {
	if (!event.active) simulation.alphaTarget(0.3).restart();
	event.subject.fx = event.subject.x;
	event.subject.fy = event.subject.y;
}

function dragged(event: d3.D3DragEvent<SVGCircleElement, nodetypes.Node, SVGCircleElement>) {
	event.subject.fx = event.x;
	event.subject.fy = event.y;
}

function dragended(
	event: d3.D3DragEvent<SVGCircleElement, nodetypes.Node, SVGCircleElement>,
	simulation: d3.Simulation<nodetypes.Node, undefined>
) {
	if (!event.active) simulation.alphaTarget(0);
	event.subject.fx = null;
	event.subject.fy = null;
}
