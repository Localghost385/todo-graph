import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as d3 from 'd3';
import { setupZoom, createTransformInterpolation } from './zoom'; // Adjust the import path as needed

describe('setupZoom', () => {
	it('should configure zoom behavior with specified extent and scale extent', () => {
		const svgElement = d3.select(document.createElement('svg'));
		const width = 800;
		const height = 600;
		const zoomBehavior = setupZoom(svgElement, width, height);

		// Check if zoomBehavior is defined
		expect(zoomBehavior).toBeDefined();

		// Check extent configuration
		const expectedExtent: [[number, number], [number, number]] = [
			[0, 0],
			[width, height]
		];
		expect(zoomBehavior.extent()()).toEqual(expectedExtent); // Call extent() as a function

		// Check scale extent configuration
		const expectedScaleExtent: [number, number] = [0.1, 10];
		expect(zoomBehavior.scaleExtent()).toEqual(expectedScaleExtent); // Call scaleExtent() to get the array
	});
});

describe('createTransformInterpolation', () => {
	beforeEach(() => {
		// Stub requestAnimationFrame before each test
		vi.stubGlobal('requestAnimationFrame', (callback) => {
			callback();
			return 0;
		});
	});

	it('should interpolate between transforms smoothly', (done) => {
		const mainGroup = d3.select(document.createElement('g'));
		const { zoomed, interpolateTransform } = createTransformInterpolation(mainGroup);

		// Simulate zoom event
		const targetTransform = d3.zoomIdentity.translate(100, 100).scale(2);
		zoomed({ transform: targetTransform } as any);

		interpolateTransform();

		// Ensure transform is updated
		setTimeout(() => {
			const transform = mainGroup.attr('transform');
			expect(transform).toBeDefined();
			expect(transform).toMatch(/translate\(\d+,\d+\) scale\(\d+\)/);
			done();
		}, 100); // Wait for the interpolation to complete
	});
});
