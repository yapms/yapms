<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import { CandidatesStore, TossupCandidateStore } from '$lib/stores/Candidates';
	import { CandidateCounts } from '$lib/stores/Regions';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	let canvasBind: HTMLCanvasElement;
	let myChart: Chart;

	$: if (myChart) {
		const counts: number[] = [];
		const colors: string[] = [];
		const labels: string[] = [];

		$CandidatesStore.forEach((candidate) => {
			let count = $CandidateCounts.get(candidate.id);
			if (count === undefined) {
				count = 0;
			}
			counts.push(count);
			colors.push(candidate.margins[0].color);
			labels.push(candidate.name);
		});

		const tossupCount = $CandidateCounts.get($TossupCandidateStore.id);
		if (tossupCount !== undefined) {
			counts.push(tossupCount);
			colors.push($TossupCandidateStore.margins[0].color);
			labels.push($TossupCandidateStore.name);
		}

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
		// todo: fix this typescript error
		myChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: [] as string[],
				datasets: [
					{
						label: '# of votes',
						data: [] as number[],
						backgroundColor: [] as string[]
					}
				]
			},
			options: {
				animation: {
					duration: 200,
					easing: 'linear'
				},
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
