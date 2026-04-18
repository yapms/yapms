<script lang="ts">
	import CandidateBoxContainer from '../candidatebox/CandidateBoxContainer.svelte';
	import ChartArea from '../chartarea/ChartArea.svelte';
	import { ChartTypeStore, ChartPositionStore } from '$lib/stores/Chart';
	import { PresentationModeStore } from '$lib/stores/PresentationMode';
	import type { Snippet } from 'svelte';
	import { reapplyPanZoom } from '$lib/utils/applyPanZoom';
	import { SideBarStore } from '$lib/stores/SideBar';

	const { children }: { children: Snippet } = $props();

	$effect(() => {
		/* eslint-disable @typescript-eslint/no-unused-expressions */
		$ChartTypeStore;
		$ChartPositionStore;
		$SideBarStore;
		reapplyPanZoom();
	});
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
		{@render children()}
	</div>
</div>
