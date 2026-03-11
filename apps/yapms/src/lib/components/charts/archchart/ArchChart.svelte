<script lang="ts">
	import { CandidatesStore, TossupCandidateStore } from '$lib/stores/Candidates';
	import { CandidateCounts, CandidateCountsMargins } from '$lib/stores/regions/Regions';
	import { ChartPositionStore } from '$lib/stores/Chart';
	import { ChartLeansStore } from '$lib/stores/ChartLeansStore';

	const seatRadius = 6;

	const marginBetweenSeats = 2;

	const rowHeight = marginBetweenSeats + seatRadius * 2;

	const candidatesWithCounts = $derived(
		$CandidatesStore.filter(
			(c) => $CandidateCounts.get(c.id) !== undefined && $CandidateCounts.get(c.id) !== 0
		)
	);

	// Arrange candidates half on one side, half on the other, with tossup in the middle.
	const arrangedCandidates = $derived([
		...candidatesWithCounts.slice(0, Math.ceil(candidatesWithCounts.length / 2)),
		$TossupCandidateStore,
		...candidatesWithCounts.slice(Math.ceil(candidatesWithCounts.length / 2))
	]);

	const numSeats = $derived([...$CandidateCounts.values()].reduce((total, cur) => total + cur, 0));

	const width = $derived(getWidthFromSeats(numSeats));

	let points = $state<{ r: number; theta: number; color: string }[]>();

	$effect(() => {
		// Determine point positions
		const rows = getRowsFromSeats(numSeats);

		let pointIdx = 0;
		const unsortedPoints = [];
		for (let i = rows; i > 0 && pointIdx < numSeats; i--) {
			let numInRow = dotsOnRow(i);
			numInRow = Math.min(numInRow, numSeats - pointIdx);

			const radius = i * rowHeight;
			for (let j = 0; j < numInRow && pointIdx < numSeats; j++) {
				// Determine position on the unit circle. Add 0.5 to j to rest on the upper semicircle
				let radians = ((j + 0.5) * Math.PI) / numInRow;

				// If point on the circle will end up on the lower semicircle, bring it back around to the upper semicircle
				if (radians > Math.PI) {
					radians += Math.PI;
				}

				// Append position of circle in polar coordinates.
				unsortedPoints.push({ r: radius, theta: radians, color: '' });

				pointIdx++;
			}
		}

		// Sort large radius to small radius and then small angle to large angle from beginning
		const sortedPoints = unsortedPoints.sort((a, b) => a.r - b.r).sort((a, b) => a.theta - b.theta);

		// Determine point colors
		const pointColors = $ChartLeansStore.enabled
			? arrangedCandidates.flatMap((c) =>
					$CandidateCountsMargins.get(c.id) !== undefined
						? $CandidateCountsMargins
								.get(c.id)!
								.flatMap((m, i) => Array(m).fill(c.margins[i].color))
						: []
				)
			: arrangedCandidates.flatMap((c) =>
					Array($CandidateCounts.get(c.id)).fill(c.margins[0].color)
				);

		sortedPoints.forEach((point, i) => (point.color = pointColors[i]));

		points = sortedPoints;
	});

	function getWidthFromSeats(targetSeats: number) {
		let rows = 0;
		let seats = 0;
		while (seats < targetSeats) {
			seats += dotsOnRow(rows);
			rows++;
		}
		return rows * (2 * rowHeight);
	}

	function getRowsFromSeats(targetSeats: number) {
		let rows = 0;
		let seats = 0;
		while (seats < targetSeats) {
			seats += dotsOnRow(rows);
			rows++;
		}
		return rows;
	}

	function dotsOnRow(nRow: number) {
		const arcRad = nRow * rowHeight;

		return Math.floor((2 * Math.PI * arcRad) / (2 * rowHeight));
	}
</script>

<div
	class="flex justify-center items-center min-w-0 aspect-2/1"
	class:h-full={$ChartPositionStore === 'bottom'}
	class:w-full={$ChartPositionStore === 'left'}
>
	<div class="w-full h-full">
		<svg
			viewBox={`-${width / 2 + seatRadius} -${width / 2 + seatRadius} ${width + seatRadius * 2} ${width / 2 + seatRadius * 2}`}
		>
			{#each points as point}
				<circle
					r={seatRadius}
					fill={point.color}
					cy={point.r * Math.sin(point.theta) * -1}
					cx={point.r * Math.cos(point.theta) * -1}
				></circle>
			{/each}
		</svg>
	</div>
</div>
