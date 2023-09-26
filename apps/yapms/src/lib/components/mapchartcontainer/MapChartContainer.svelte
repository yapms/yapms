<script lang="ts">
	import { afterUpdate } from 'svelte';
	import CandidateBoxContainer from '../candidatebox/CandidateBoxContainer.svelte';
	import ChartArea from '../chartarea/ChartArea.svelte';
	import { ChartPositionStore } from '$lib/stores/Chart';
	import { reapplyPanZoom } from '$lib/utils/applyPanZoom';

	afterUpdate(reapplyPanZoom);
</script>

<div
	id="map-chart-div"
	class="flex flex-grow basis-9/12"
	class:flex-col-reverse={$ChartPositionStore === 'bottom'}
	class:flex-row={$ChartPositionStore === 'left'}
>
	<ChartArea />
	<div class="overflow-hidden w-full h-full max-w-[100vw]">
		<CandidateBoxContainer />
		<slot />
	</div>
</div>
