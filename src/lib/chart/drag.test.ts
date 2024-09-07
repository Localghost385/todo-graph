import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as d3 from 'd3';
import { setupDrag } from './drag'; // Assuming your original file is called drag.ts
import type * as nodetypes from '../types/nodetypes';

describe('setupDrag', () => {
	let simulation: d3.Simulation<nodetypes.Node, undefined>;
	let node: nodetypes.Node;

	beforeEach(() => {
		// Mock node and simulation
		node = { x: 100, y: 100 } as nodetypes.Node;
		simulation = d3
			.forceSimulation<nodetypes.Node>([node])
			.force('center', d3.forceCenter(300, 300))
			.force('charge', d3.forceManyBody());

		// Mock necessary d3 methods used within the drag functions
		vi.spyOn(simulation, 'alphaTarget');
		vi.spyOn(simulation, 'restart');
	});

	it('should start the drag and update fx and fy on start', () => {
		const drag = setupDrag(simulation);
		const startEvent = {
			active: false,
			subject: node
		} as unknown as d3.D3DragEvent<SVGCircleElement, nodetypes.Node, SVGCircleElement>;

		drag.on('start')(startEvent);

		expect(simulation.alphaTarget).toHaveBeenCalledWith(0.3);
		expect(simulation.restart).toHaveBeenCalled();
		expect(node.fx).toBe(100);
		expect(node.fy).toBe(100);
	});

	it('should update node position during drag', () => {
		const drag = setupDrag(simulation);
		const dragEvent = {
			x: 200,
			y: 200,
			subject: node
		} as unknown as d3.D3DragEvent<SVGCircleElement, nodetypes.Node, SVGCircleElement>;

		drag.on('drag')(dragEvent);

		expect(node.fx).toBe(200);
		expect(node.fy).toBe(200);
	});

	it('should reset fx and fy on drag end', () => {
		const drag = setupDrag(simulation);
		const endEvent = {
			active: false,
			subject: node
		} as unknown as d3.D3DragEvent<SVGCircleElement, nodetypes.Node, SVGCircleElement>;

		drag.on('end')(endEvent);

		expect(simulation.alphaTarget).toHaveBeenCalledWith(0);
		expect(node.fx).toBeNull();
		expect(node.fy).toBeNull();
	});
});
