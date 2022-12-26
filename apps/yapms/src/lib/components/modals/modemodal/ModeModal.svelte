<script lang="ts">
	import { ModeModalStore } from '$lib/stores/Modals';
	import { ModeStore } from '$lib/stores/Mode';
	import type { Mode } from '$lib/types/Mode';

	const modes = ['fill','edit','disable','lock'];

	function close() {
		ModeModalStore.set({
			...$ModeModalStore,
			open: false
		});
	}

	function setMode(id: string) {
		ModeStore.set(id as Mode)
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$ModeModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<h2 class="text-2xl">Change Mode</h2>
		<br>
		<div class="tabs flex-row lg:flex-col flex-end items-center space-y-2 justify-evenly">
			{#each modes as mode}
				<button
					class="btn gap-1 w-2/3 lg:w-1/2"
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
			<button class="btn btn-primary" on:click={close}>Close</button>
		</div>
	</div>
</div>
