<script lang="ts">
	import { ThemeModalStore } from '$lib/stores/Modals';
	import ModalTitle from '../../modalutilities/ModalTitle.svelte';
	import ThemeGrid from '../../modalutilities/ThemeGrid.svelte';

	function close() {
		ThemeModalStore.set({
			...$ThemeModalStore,
			open: false
		});
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$ThemeModalStore.open} />
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
