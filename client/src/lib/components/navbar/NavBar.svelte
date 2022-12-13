<script lang="ts">
	import { ChartPositionStore } from '$lib/stores/Chart';
	import { ClearMapModalStore, MapModalStore, AddCandidateModalStore } from '$lib/stores/Modals';
	import { ModeStore } from '$lib/stores/Mode';
	import type { Mode } from '$lib/types/Mode';

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

	function setMode(mode: Mode) {
		ModeStore.set(mode);
	}

	function toggleChartPosition() {
		ChartPositionStore.update((chartPosition) => {
			return chartPosition === 'left' ? 'bottom' : 'left';
		});
	}

</script>

<div class="navbar bg-base-200 gap-3">
	<button class="btn btn-sm"> home </button>
	<button class="btn btn-sm" on:click={openClearMapModal}> clear </button>
	<button class="btn btn-sm" on:click={openMapModal}> maps </button>
	<button class="btn btn-sm" on:click={openAddCandidateModal}>Add Candidate</button>
	<button class="btn btn-sm" on:click={toggleChartPosition}> chart position </button>
	<button class="btn btn-sm hidden md:inline"> close sidebar </button>
	<div class="dropdown">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label tabindex="-1" class="btn btn-sm">mode: {$ModeStore}</label>
		<ul tabindex="-1" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4">
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li><a on:click={() => setMode('fill')}>Fill</a></li>
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li><a on:click={() => setMode('edit')}>Edit</a></li>
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li><a on:click={() => setMode('disable')}>Disable</a></li>
		</ul>
	</div>
	<div class="dropdown">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label tabindex="-1" class="btn btn-sm">Theme</label>
		<ul tabindex="-1" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4">
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li><a data-set-theme="light" data-act-class="ACTIVECLASS">Light</a></li>
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li><a data-set-theme="dark" data-act-class="ACTIVECLASS">Dark</a></li>
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li><a data-set-theme="cupcake" data-act-class="ACTIVECLASS">Cupcake</a></li>
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li><a data-set-theme="aqua" data-act-class="ACTIVECLASS">Aqua</a></li>
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li><a data-set-theme="lofi" data-act-class="ACTIVECLASS">Lofi</a></li>
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li><a data-set-theme="night" data-act-class="ACTIVECLASS">Night</a></li>
		</ul>
	</div>
</div>
