<script lang="ts">
	import { ChartPositionStore } from '$lib/stores/Chart';
	import { StyleModalStore } from '$lib/stores/Modals';
	import ModalTitle from '../../modalutilities/ModalTitle.svelte';
	import ThemeGrid from '../../modalutilities/ThemeGrid.svelte';

	function close() {
		StyleModalStore.set({
			...$StyleModalStore,
			open: false
		});
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$StyleModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<ModalTitle title="Change Style" />
		<div class="flex flex-row lg:flex-col">
			<div class="flex flex-col">
				<h3 class="font-light text-lg pb-3">Themes</h3>
				<ThemeGrid />
			</div>
		</div>
		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}>No</button>
		</div>
	</div>
</div>
