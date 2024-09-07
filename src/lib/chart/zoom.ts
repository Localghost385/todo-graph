import * as d3 from 'd3';

export function setupZoom(
	svgElement: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	width: number,
	height: number
) {
	return d3
		.zoom<SVGSVGElement, unknown>()
		.extent([
			[0, 0],
			[width, height]
		])
		.scaleExtent([0.1, 10]);
}

export function createTransformInterpolation(
	mainGroup: d3.Selection<SVGGElement, unknown, null, undefined>
) {
	let mainTransform = d3.zoomIdentity;
	let targetTransform = d3.zoomIdentity;
	const lerpFactor = 0.01; // Adjust this value to control the speed of interpolation

	function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, unknown>): void {
		targetTransform = event.transform;
	}

	function interpolateTransform() {
		mainTransform = d3.zoomIdentity
			.translate(
				lerp(mainTransform.x, targetTransform.x, lerpFactor),
				lerp(mainTransform.y, targetTransform.y, lerpFactor)
			)
			.scale(lerp(mainTransform.k, targetTransform.k, lerpFactor));

		mainGroup.attr('transform', mainTransform);

		if (!transformIsClose(mainTransform, targetTransform)) {
			requestAnimationFrame(interpolateTransform);
		}
	}

	function lerp(start: number, end: number, factor: number): number {
		return start + (end - start) * factor;
	}

	function transformIsClose(a: d3.ZoomTransform, b: d3.ZoomTransform, threshold = 0.01): boolean {
		return (
			Math.abs(a.x - b.x) < threshold &&
			Math.abs(a.y - b.y) < threshold &&
			Math.abs(a.k - b.k) < threshold
		);
	}

	return { zoomed, interpolateTransform };
}
