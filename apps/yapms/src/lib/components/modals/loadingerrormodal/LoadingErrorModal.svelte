<script lang="ts">
	import ModalTitle from '$lib/components/modalutilities/ModalTitle.svelte';
	import { LoadingErrorModalStore } from '$lib/stores/Modals';

	function close() {
		LoadingErrorModalStore.set({
			...$LoadingErrorModalStore,
			open: false
		});
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$LoadingErrorModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<ModalTitle title="Loading Error" />
		<p>There seems to have been an issue loading your map. Sorry about that!</p>
		<p />
		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}> Okay </button>
		</div>
	</div>
</div>
