<script lang="ts">
	import { afterUpdate } from 'svelte';
	import CandidateBoxContainer from '../candidatebox/CandidateBoxContainer.svelte';
	import ChartArea from '../chartarea/ChartArea.svelte';
	import { ChartPositionStore } from '$lib/stores/Chart';
	import { reapplyPanZoom } from '$lib/utils/applyPanZoom';
	import { PresentationModeStore } from '$lib/stores/PresentationMode';

	afterUpdate(reapplyPanZoom);
</script>

<div
	id="map-chart-div"
	class="flex flex-grow basis-9/12 max-w-[100vw]"
	class:flex-col-reverse={$ChartPositionStore === 'bottom'}
	class:flex-row={$ChartPositionStore === 'left'}
>
	<ChartArea />
	<div class="overflow-hidden w-full h-full">
		<CandidateBoxContainer margins={$PresentationModeStore.enabled} />
		<slot />
	</div>
</div>
