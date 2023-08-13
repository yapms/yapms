<script lang="ts">
	import { ChartPositionStore, ChartTypeStore } from '$lib/stores/Chart';
	import { OptionsModalStore } from '$lib/stores/Modals';
	import type { ChartType } from '$lib/types/ChartType';
	import ModalBase from '../ModalBase.svelte';
	import type ChartPosition from '$lib/types/ChartPosition';
	import { reapplyPanZoom } from '$lib/utils/applyPanZoom';
	import { LockMapStore } from '$lib/stores/LockMap';

	const chartTypeValues = ['pie', 'battle', 'none'];
	const chartPositionValues = ['bottom', 'left'];

	function setChartType(id: string) {
		ChartTypeStore.set(id as ChartType);
		reapplyPanZoom();
	}

	function setChartPosition(id: string) {
		ChartPositionStore.set(id as ChartPosition);
		reapplyPanZoom();
	}
</script>

<ModalBase title="Options" store={OptionsModalStore}>
	<div slot="content">
		<div class="flex flex-col">
			<h3 class="font-light text-lg pb-3">Chart Type</h3>
			<div class="flex gap-3 justify-center flex-wrap">
				{#each chartTypeValues as type}
					<button
						class="btn btn-lg"
						class:btn-primary={$ChartTypeStore !== type}
						class:btn-success={$ChartTypeStore === type}
						on:click={() => {
							setChartType(type);
						}}
					>
						<span>
							{type}
						</span>
					</button>
				{/each}
			</div>
			<h3 class="font-light text-lg pt-3 pb-3">Chart Position</h3>
			<div class="flex gap-3 justify-center flex-wrap">
				{#each chartPositionValues as type}
					<button
						class="btn btn-lg"
						class:btn-primary={$ChartPositionStore !== type}
						class:btn-success={$ChartPositionStore === type}
						on:click={() => {
							setChartPosition(type);
						}}
					>
						<span>
							{type}
						</span>
					</button>
				{/each}
			</div>
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">Lock Map</span>
					<input type="checkbox" class="toggle" bind:checked={$LockMapStore} />
				</label>
			</div>
		</div>
	</div>
</ModalBase>
