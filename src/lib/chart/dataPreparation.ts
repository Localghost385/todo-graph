import type * as nodetypes from '$lib/types/nodetypes';

export function prepareData(data: nodetypes.File, width: number, height: number) {
	const nodes: nodetypes.Node[] = data.nodes.map((d) => ({
		...d,
		x: Math.random() * width,
		y: Math.random() * height
	}));

	const links: nodetypes.Link[] = data.links.map((d) => ({ ...d }));

	return { nodes, links };
}
