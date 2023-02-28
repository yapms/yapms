<script lang="ts">
	import { HomeThemeModalStore } from '$lib/stores/Modals';
	import ModalTitle from '../../modalutilities/ModalTitle.svelte';
	import ThemeGrid from '../stylemodal/ThemeGrid.svelte';

	function close() {
		HomeThemeModalStore.set({
			...$HomeThemeModalStore,
			open: false
		});
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$HomeThemeModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<ModalTitle title="Change Theme" />
		<div class="flex flex-row lg:flex-col">
			<ThemeGrid />
		</div>

		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}>No</button>
		</div>
	</div>
</div>
