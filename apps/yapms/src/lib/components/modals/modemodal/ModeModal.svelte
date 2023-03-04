<script lang="ts">
	import { ModeModalStore } from '$lib/stores/Modals';
	import { ModeStore } from '$lib/stores/Mode';
	import type { Mode } from '$lib/types/Mode';
	import ModalTitle from '../../modalutilities/ModalTitle.svelte';

	const modes = ['fill', 'split', 'edit', 'disable', 'lock'];

	function close() {
		ModeModalStore.set({
			...$ModeModalStore,
			open: false
		});
	}

	function setMode(id: string) {
		ModeStore.set(id as Mode);
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$ModeModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<ModalTitle title="Change Mode" />
		<div class="grid grid-cols-2 grid-flow-row gap-4">
			{#each modes as mode}
				<button
					class="btn"
					class:btn-primary={$ModeStore !== mode}
					class:btn-success={$ModeStore === mode}
					on:click={() => {
						setMode(mode);
						close();
					}}
				>
					<span>
						{mode.toUpperCase()}
					</span>
				</button>
			{/each}
		</div>
		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}>No</button>
		</div>
	</div>
</div>
