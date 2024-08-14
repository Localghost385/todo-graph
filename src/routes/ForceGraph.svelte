<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let svgElement: SVGSVGElement | null = null;

	onMount(() => {
		if (!svgElement) return;

		// Define data
		interface Node {
			id: string;
			x?: number;
			y?: number;
			fx?: number | null;
			fy?: number | null;
			vx?: number; // Velocity in x direction
			vy?: number; // Velocity in y direction
		}

		interface Link {
			source: string;
			target: string;
			value?: number;
		}

		// Nodes with initial velocities
		const nodes: Node[] = [
			{ id: 'A', vx: Math.random() * 2 - 1, vy: Math.random() * 2 - 1 },
			{ id: 'B', vx: Math.random() * 2 - 1, vy: Math.random() * 2 - 1 },
			{ id: 'C', vx: Math.random() * 2 - 1, vy: Math.random() * 2 - 1 },
			{ id: 'D', vx: Math.random() * 2 - 1, vy: Math.random() * 2 - 1 }
		];

		const links: Link[] = [
			{ source: 'A', target: 'B' },
			{ source: 'A', target: 'C' },
			{ source: 'B', target: 'C' },
			{ source: 'C', target: 'D' }
		];

		// Initial dimensions
		let width = window.innerWidth;
		let height = window.innerHeight;

		// Create the SVG container
		const svg = d3
			.select(svgElement)
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('viewBox', `0 0 ${width} ${height}`)
			.attr('preserveAspectRatio', 'xMidYMid meet');

		// Define zoom behavior
		const zoom = d3.zoom().scaleExtent([0.5, 32]).interpolate(d3.interpolate).on('zoom', zoomed);

		svg.call(zoom);

		// Initialize the simulation
		const simulation = d3
			.forceSimulation(nodes)
			.force(
				'link',
				d3
					.forceLink(links)
					.id((d: Node) => d.id)
					.distance(100)
			)
			.force('charge', d3.forceManyBody().strength(-300))
			.force('center', d3.forceCenter(width / 2, height / 2))
			.alphaDecay(0.005)
			.alphaTarget(0.3);

		// Create the links
		const link = svg
			.append('g')
			.attr('stroke', '#41445a')
			.attr('stroke-opacity', 0.6)
			.selectAll('line')
			.data(links)
			.join('line')
			.attr('stroke-width', (d: Link) => Math.sqrt(d.value || 1));

		// Create the nodes
		const node = svg
			.append('g')
			.attr('stroke', '#41445a')
			.attr('stroke-width', 1.5)
			.selectAll('g')
			.data(nodes)
			.join('g')
			.call(drag(simulation));

		node.append('circle').attr('r', 10).attr('fill', '#ffffff');

		if (VITE_DEV) {
			node
				.append('line')
				.attr('stroke', 'red')
				.attr('stroke-width', 2)
				.attr('x1', 0)
				.attr('y1', 0)
				.attr('x2', (d) => (d.vx ? d.vx * 10 : 0))
				.attr('y2', (d) => (d.vy ? d.vy * 10 : 0));
		}

		// Define drag behavior
		function drag(simulation: d3.Simulation<Node, Link>) {
			function dragstarted(event: d3.D3DragEvent<SVGElement, Node, Node>, d: Node) {
				if (!event.active) simulation.alphaTarget(0.3).restart();
				d.fx = d.x;
				d.fy = d.y;
				d.vx = 0;
				d.vy = 0;
			}

			function dragged(event: d3.D3DragEvent<SVGElement, Node, Node>, d: Node) {
				d.fx = event.x;
				d.fy = event.y;
			}

			function dragended(event: d3.D3DragEvent<SVGElement, Node, Node>, d: Node) {
				if (!event.active) simulation.alphaTarget(0);
				d.fx = null;
				d.fy = null;
			}

			return d3
				.drag<SVGElement, Node>()
				.on('start', dragstarted)
				.on('drag', dragged)
				.on('end', dragended);
		}

		// Update positions on each tick
		simulation.on('tick', () => {
			link
				.attr('x1', (d: Link) => (d.source as unknown as Node).x ?? 0)
				.attr('y1', (d: Link) => (d.source as unknown as Node).y ?? 0)
				.attr('x2', (d: Link) => (d.target as unknown as Node).x ?? 0)
				.attr('y2', (d: Link) => (d.target as unknown as Node).y ?? 0);

			node
				.attr('transform', (d: Node) => `translate(${d.x ?? 0},${d.y ?? 0})`)
				.selectAll('line')
				.attr('x2', (d) => (d.vx ? d.vx * 10 : 0))
				.attr('y2', (d) => (d.vy ? d.vy * 10 : 0));
		});

		// Zoom event handler
		function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
			svg.selectAll('g').attr('transform', event.transform);
		}

		// Handle window resize
		function handleResize() {
			width = window.innerWidth;
			height = window.innerHeight;

			svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', '100%');

			// Update simulation parameters
			simulation.force('center', d3.forceCenter(width / 2, height / 2));
		}

		window.addEventListener('resize', handleResize);
		handleResize(); // Initial resize to set up dimensions

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<svg bind:this={svgElement}></svg>

<style>
	svg {
		background: #ffffff;
	}
</style>
