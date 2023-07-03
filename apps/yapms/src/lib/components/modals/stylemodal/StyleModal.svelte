<script lang="ts">
	import LogoGrid from '$lib/components/modalutilities/LogoGrid.svelte';
	import { StyleModalStore } from '$lib/stores/Modals';
	import ModalTitle from '../../modalutilities/ModalTitle.svelte';
	import ThemeGrid from '../../modalutilities/ThemeGrid.svelte';

	function close() {
		StyleModalStore.set({
			...$StyleModalStore,
			open: false
		});
	}

	function toggleInsets() {
		const svg = document.getElementById('map-div')?.querySelector<SVGElement>('svg');
		if (svg) {
			svg.classList.toggle('insetsHidden');
		}
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$StyleModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<ModalTitle title="Change Style" />
		<div class="flex flex-row lg:flex-col gap-3">
			<div class="flex flex-col">
				<h3 class="font-light text-lg pb-3">Themes</h3>
				<ThemeGrid />
			</div>
			<div class="flex flex-col">
				<h3 class="font-light text-lg pb-3">Logos</h3>
				<LogoGrid />
			</div>
			<h3 class="font-light text-lg">Other</h3>
			<div class="flex flex-row gap-x-2 items-center">
				<input
					type="checkbox"
					checked={$StyleModalStore.insetsHidden}
					on:change={toggleInsets}
					class="checkbox"
				/>
				<h3 class="font-light text-lg pb">Hide Insets</h3>
			</div>
		</div>
		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}>No</button>
		</div>
	</div>
</div>
