import * as d3 from 'd3';
import type * as nodetypes from '../types/nodetypes';

export function drawElements(
	svgElement: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	nodes: nodetypes.Node[],
	links: nodetypes.Link[]
) {
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
		.attr(
			'class',
			'node fill-surface-50 dark:fill-surface-900 hover:fill-surface-00 dark:hover:fill-surface-700 stroke-[#41445a] dark:stroke-[#E3E3E6] hover:fill-[#D8D9DD] dark:hover:fill-[#20212C] hover:stroke-[#41445a] dark:hover:stroke-[#E3E3E6]'
		)
		.attr('target', '_blank')
		.append('circle')
		.attr('r', 5);

	node.append('title').text((d) => d.id);

	return { link, node, mainGroup };
}
