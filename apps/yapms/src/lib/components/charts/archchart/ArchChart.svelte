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

	const pointColors = $derived.by(() => {
		if (!$ChartLeansStore.enabled) {
			return arrangedCandidates.flatMap((c) =>
				Array($CandidateCounts.get(c.id) ?? 0).fill(c.margins[0].color)
			);
		}

		const colors = arrangedCandidates.map((c) =>
			$CandidateCountsMargins.get(c.id) !== undefined
				? $CandidateCountsMargins.get(c.id)!.flatMap((m, i) => Array(m).fill(c.margins[i].color))
				: []
		);

		if (arrangedCandidates.length === 3) {
			colors[2].reverse();
		}

		return colors.flat();
	});

	const numSeats = $derived([...$CandidateCounts.values()].reduce((total, cur) => total + cur, 0));

	// Use one extra row on the outside so we have to use less rows in the inside to allow for a larger "hole" at the bottom of the chart
	const rows = $derived(getRowsFromSeats(numSeats) + 1);

	const maxForRows = $derived(getSeatsFromRow(rows));

	// Remove inner rows as far as possible to push fill factor as close to 1 as possible
	const startingRow = $derived.by(() => {
		let starter = 1;
		let spotsRemoved = 0;

		while (maxForRows - (dotsOnRow(starter) + spotsRemoved) >= numSeats) {
			spotsRemoved += dotsOnRow(starter);
			starter++;
		}
		return starter;
	});

	const actualSpots = $derived(maxForRows - getSeatsFromRow(startingRow));

	const fillFactor = $derived(numSeats / actualSpots);

	const width = $derived(rows * 2 * rowHeight);

	const points = $derived.by(() => {
		let pointIdx = 0;
		const unsortedPoints = [];

		for (let i = startingRow; i < rows && pointIdx < numSeats; i++) {
			let numInRow = Math.round(fillFactor * dotsOnRow(i));
			numInRow = Math.min(numInRow, numSeats - pointIdx);
			// Put all remaining seats lost in rounding on the outside row
			if (i === rows - 1) numInRow = numSeats - pointIdx;

			const radius = i * rowHeight;
			for (let j = 0; j < numInRow && pointIdx < numSeats; j++) {
				// Determine position along the top half of the unit circle.
				const percentageAlongSemicircle = j / numInRow;
				//Adjust to the midpoint of the interval from [i/numInRow, i+1/numInRow]. e.x: [0, 0.5] becomes [0.25, 0.75] for 2 points
				const midpointOffset = 0.5 / numInRow;

				const theta = (percentageAlongSemicircle + midpointOffset) * Math.PI;

				// Append position of circle in polar coordinates.
				unsortedPoints.push({ radius, theta });

				pointIdx++;
			}
		}

		// Sort large radius to small radius and then small angle to large angle from beginning
		return unsortedPoints.sort((a, b) => a.radius - b.radius).sort((a, b) => a.theta - b.theta);
	});

	function getRowsFromSeats(targetSeats: number) {
		let rows = 0;
		let seats = 0;
		while (seats < targetSeats) {
			seats += dotsOnRow(rows);
			rows++;
		}
		return rows;
	}

	function getSeatsFromRow(targetRows: number) {
		let rows = 0;
		let seats = 0;
		while (rows < targetRows) {
			seats += dotsOnRow(rows);
			rows++;
		}
		return seats;
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
	<div class="flex w-full h-full">
		<svg
			viewBox={`-${width / 2 + seatRadius} -${width / 2 + seatRadius} ${width + seatRadius * 2} ${width / 2 + seatRadius * 2}`}
		>
			{#each points as point, idx (idx)}
				<circle
					class="transition-colors"
					r={seatRadius}
					fill={pointColors[idx]}
					cy={point.radius * Math.sin(point.theta) * -1}
					cx={point.radius * Math.cos(point.theta) * -1}
				></circle>
			{/each}
		</svg>
	</div>
</div>
