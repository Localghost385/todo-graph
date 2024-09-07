import { describe, it, expect, vi } from 'vitest';
import * as d3 from 'd3';
import { drawElements } from './drawElements'; // Adjust the import path as needed
import type * as nodetypes from '../types/nodetypes';

// Mock the d3 methods
vi.mock('d3', () => {
	const mockAppend = vi.fn(() => mockSelection);
	const mockSelectAll = vi.fn(() => mockSelection);
	const mockSelect = vi.fn(() => mockSelection);
	const mockEnter = vi.fn(() => mockSelection);
	const mockData = vi.fn(() => ({
		enter: mockEnter
	}));
	const mockDataSelection = vi.fn(() => ({
		enter: mockEnter
	}));
	const mockSelection = {
		append: mockAppend,
		selectAll: mockSelectAll,
		data: mockData,
		attr: vi.fn().mockReturnThis(),
		text: vi.fn().mockReturnThis(),
		append: mockAppend,
		select: mockSelect
	};

	return { select: mockSelect };
});

describe('drawElements', () => {
	it('should correctly append and configure SVG elements for nodes and links', () => {
		const svgElement = d3.select('svg'); // Adjust based on how you mock/select the SVG element
		const nodes: nodetypes.Node[] = [{ id: 'node1' }, { id: 'node2' }];
		const links: nodetypes.Link[] = [{ source: 'node1', target: 'node2', value: 10 }];

		const { link, node, mainGroup } = drawElements(svgElement, nodes, links);

		// Verify that mainGroup.append('g') was called
		expect(svgElement.append).toHaveBeenCalledWith('g');

		// Verify that link elements are created
		expect(mainGroup.selectAll).toHaveBeenCalledWith('line');
		expect(mainGroup.selectAll().data).toHaveBeenCalledWith(links);
		expect(mainGroup.selectAll().data().enter().append).toHaveBeenCalledWith('line');
		expect(mainGroup.selectAll().data().enter().append().attr).toHaveBeenCalledWith(
			'stroke-width',
			expect.any(Function)
		);

		// Verify that node elements are created
		expect(mainGroup.selectAll).toHaveBeenCalledWith('.node');
		expect(mainGroup.selectAll().data).toHaveBeenCalledWith(nodes);
		expect(mainGroup.selectAll().data().enter().append).toHaveBeenCalledWith('a');
		expect(mainGroup.selectAll().data().enter().append().append).toHaveBeenCalledWith('circle');

		// Verify the attributes are set correctly for nodes and links
		expect(link.attr).toHaveBeenCalledWith('stroke-width', expect.any(Function));
		expect(node.append).toHaveBeenCalledWith('title');
		expect(node.append().attr).toHaveBeenCalledWith('r', 5);
	});
});
