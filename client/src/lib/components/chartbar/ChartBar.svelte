<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import type Candidate from '$lib/types/Candidate';

	export let candidates: Candidate[];

	let canvasBind: HTMLCanvasElement;
	let myChart: Chart;

	$: if (myChart) {
		const counts = candidates.map((candidate) => {
			return candidate.margins.reduce((acc, margin) => {
				return acc + margin.count;
			}, 0);
		});
		const colors = candidates.map((candidate) => {
			return candidate.margins[0].color;
		});
		const labels = candidates.map((candidate) => {
			return candidate.name;
		});
		myChart.data.datasets[0].data = counts;
		myChart.data.datasets[0].backgroundColor = colors;
		myChart.data.labels = labels;
		myChart.update();
	}

	onMount(() => {
		const ctx = canvasBind.getContext('2d');
		if (ctx === null) {
			return;
		}
		if (myChart) {
			myChart.destroy();
		}
		Chart.register(...registerables);
		Chart.register(ChartDataLabels);
		myChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: [],
				datasets: [
					{
						label: '# of votes',
						data: [],
						backgroundColor: []
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: false
					},
					datalabels: {
						color: 'black',
						borderColor: 'white',
						borderRadius: 5,
						borderWidth: 2,
						backgroundColor: 'white',
						font: {
							weight: 'bold',
							size: 16
						},
						display: (context) => {
							const count = context.dataset.data[context.dataIndex];
							return count !== null && count > 0;
						}
					}
				}
			}
		});
	});
</script>

<div class="w-min h-min">
	<canvas bind:this={canvasBind} />
</div>
