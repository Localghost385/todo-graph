import * as d3 from 'd3';
import { prepareData } from './dataPreparation';
import { drawElements } from './drawElements';
import { setupSimulation, setupSimulationUpdate } from './simulation';
import { setupDrag } from './drag';
import { setupZoom, createTransformInterpolation } from './zoom';
import type * as nodetypes from '../types/nodetypes';

export function createChart(svg: SVGSVGElement | null, data: nodetypes.File): void {
	if (!svg) return;

	const width = window.innerWidth;
	const height = window.innerHeight;

	const svgElement = d3.select(svg).attr('width', width).attr('height', height);

	const { nodes, links } = prepareData(data, width, height);

	const simulation = setupSimulation(nodes, links, width, height);

	const zoomBehavior = setupZoom(svgElement, width, height);
	const { link, node, mainGroup } = drawElements(svgElement, nodes, links);

	node.call(setupDrag(simulation));

	setupSimulationUpdate(simulation, link, node);

	const { zoomed, interpolateTransform } = createTransformInterpolation(mainGroup);
	svgElement.call(
		zoomBehavior.on('zoom', (event) => {
			zoomed(event);
			requestAnimationFrame(interpolateTransform);
		})
	);
}
