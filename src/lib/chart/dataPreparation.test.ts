import { describe, it, expect } from 'vitest';
import { prepareData } from './dataPreparation';
import type { File } from '../types/nodetypes';

describe('prepareData', () => {
	it('should prepare nodes and links with random positions', () => {
		const data: File = {
			nodes: [
				{ id: 'node1', group: 1 },
				{ id: 'node2', group: 2 }
			],
			links: [{ source: { id: 'node1', group: 1 }, target: { id: 'node2', group: 2 }, value: 10 }]
		};

		const width = 500;
		const height = 500;

		const result = prepareData(data, width, height);

		expect(result.nodes.length).toBe(2);
		expect(result.links.length).toBe(1);

		result.nodes.forEach((node) => {
			expect(node.x).toBeGreaterThanOrEqual(0);
			expect(node.x).toBeLessThanOrEqual(width);
			expect(node.y).toBeGreaterThanOrEqual(0);
			expect(node.y).toBeLessThanOrEqual(height);
		});
	});
});
