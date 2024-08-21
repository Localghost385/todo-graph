export type Node = {
	id: string;
	group: string;
	radius?: number;
	citing_patents_count?: number;
	x?: number;
	y?: number;
	vx?: number;
	vy?: number;
};

export type Link = {
	source: string;
	target: string;
	value: number;
};

export type File = {
	default: {
		nodes: Node[];
		links: Link[];
	};
	nodes: Node[];
	links: Link[];
};
