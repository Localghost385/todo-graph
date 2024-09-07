import { describe, it, expect } from 'vitest';
import * as d3 from 'd3';
import { setupSimulation, setupSimulationUpdate } from './simulation';
import type { Node, Link } from '../types/nodetypes';

describe('setupSimulation', () => {
	it('should create a D3 simulation with the correct forces', () => {
		const nodes: Node[] = [
			{ id: 'node1', group: 1 },
			{ id: 'node2', group: 2 }
		];
		const links: Link[] = [{ source: nodes[0], target: nodes[1], value: 10 }];
		const width = 500;
		const height = 500;

		const simulation = setupSimulation(nodes, links, width, height);

		expect(simulation.alpha()).toBe(1);
		expect(simulation.force('link')).not.toBeUndefined();
		expect(simulation.force('charge')).not.toBeUndefined();
		expect(simulation.force('x')).not.toBeUndefined();
		expect(simulation.force('y')).not.toBeUndefined();
	});
});
