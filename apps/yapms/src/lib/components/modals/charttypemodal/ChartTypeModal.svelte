<script lang="ts">
	import { ChartTypeStore } from '$lib/stores/Chart';
	import { ChartTypeModalStore } from '$lib/stores/Modals';
	import type { ChartType } from '$lib/types/ChartType';
	import ModalTitle from '../ModalTitle.svelte';

	const types = ['pie','battle'];

	function close() {
		ChartTypeModalStore.set({
			...$ChartTypeModalStore,
			open: false
		});
	}

	function setChartType(id: string) {
		ChartTypeStore.set(id as ChartType)
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$ChartTypeModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<ModalTitle title="Change Chart Type" />
		<div class="tabs flex-row lg:flex-col flex-end items-center space-y-2 justify-evenly">
			{#each types as type}
				<button
					class="btn gap-1 w-2/3 lg:w-1/2"
					class:btn-primary={$ChartTypeStore !== type}
					class:btn-success={$ChartTypeStore === type}
					on:click={() => {
						setChartType(type);
						close();
					}}
				>
					<span>
						{type.toUpperCase()}
					</span>
				</button>
			{/each}
		</div>
		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}>No</button>
		</div>
	</div>
</div>
