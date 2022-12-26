<script lang="ts">
	import { ChartPositionStore } from '$lib/stores/Chart';
	import { ClearMapModalStore, MapModalStore, AddCandidateModalStore, ModeModalStore, ChartTypeModalStore, ThemeModalStore } from '$lib/stores/Modals';
	import { ModeStore } from '$lib/stores/Mode';

	function openClearMapModal() {
		ClearMapModalStore.set({
			...$ClearMapModalStore,
			open: true
		});
	}

	function openMapModal() {
		MapModalStore.set({
			...$MapModalStore,
			open: true
		});
	}

	function openAddCandidateModal() {
		AddCandidateModalStore.set({
			...$AddCandidateModalStore,
			open: true
		});
	}

	function openChartType() {
		ChartTypeModalStore.set({
			...$ChartTypeModalStore,
			open: true
		});
	}

	function openMode() {
		ModeModalStore.set({
			...$ModeModalStore,
			open: true
		});
	}

	function openTheme() {
		ThemeModalStore.set({
			...$ThemeModalStore,
			open: true
		});
	}

	function toggleChartPosition() {
		ChartPositionStore.update((chartPosition) => {
			return chartPosition === 'left' ? 'bottom' : 'left';
		});
	}
</script>

<div class="navbar bg-base-200 gap-3 overflow-x-scroll overflow-y-clip lg:overflow-x-clip">
	<button class="btn btn-sm">home</button>
	<button class="btn btn-sm" on:click={openClearMapModal}>clear</button>
	<button class="btn btn-sm" on:click={openMapModal}>maps</button>
	<button class="btn btn-sm" on:click={openAddCandidateModal}>add candidate</button>
	<button class="btn btn-sm" on:click={toggleChartPosition}>chart position</button>
	<button class="btn btn-sm" on:click={openChartType}>chart type</button>
	<button class="btn btn-sm" on:click={openMode}>mode: {$ModeStore}</button>
	<button class="btn btn-sm" on:click={openTheme}>theme</button>
</div>
