<script lang="ts">
	import {
		ClearMapModalStore,
		MapModalStore,
		AddCandidateModalStore,
		ModeModalStore,
		ChartTypeModalStore,
		StyleModalStore,
		ShareModalStore,
		LoginModalStore
	} from '$lib/stores/Modals';
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

	function openStyle() {
		StyleModalStore.set({
			...$StyleModalStore,
			open: true
		});
	}

	function openShare() {
		ShareModalStore.set({
			...$ShareModalStore,
			open: true
		});
	}

	function openLogin() {
		LoginModalStore.set({
			...$LoginModalStore,
			open: true
		});
	}
</script>

<div class="navbar bg-base-200 gap-3 overflow-x-scroll overflow-y-clip lg:overflow-x-clip min-h-0">
	<a href="/" class="btn btn-sm">home</a>
	<button class="btn btn-sm" on:click={openClearMapModal}>clear</button>
	<button class="btn btn-sm" on:click={openMapModal}>maps</button>
	<button class="btn btn-sm" on:click={openAddCandidateModal}>add candidate</button>
	<button class="btn btn-sm" on:click={openStyle}>style</button>
	<button class="btn btn-sm" on:click={openChartType}>chart type</button>
	<button class="btn btn-sm" on:click={openMode}>mode: {$ModeStore}</button>
	<button class="btn btn-sm" on:click={openShare}>share</button>
	<button class="btn btn-sm" on:click={openLogin}>login</button>
</div>
