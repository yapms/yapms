<script lang="ts">
	import { ModeModalStore } from '$lib/stores/Modals';
	import { ModeStore } from '$lib/stores/Mode';
	import type { Mode } from '$lib/types/Mode';
	import ModalBase from '../ModalBase.svelte';

	const modes: Mode[] = ['fill', 'split', 'edit', 'disable', 'lock'];

	function setMode(id: Mode) {
		$ModeStore = id;
	}
</script>

<ModalBase title="Change Mode" store={ModeModalStore}>
	<div slot="content">
		<div class="grid grid-cols-2 grid-flow-row gap-4">
			{#each modes as mode}
				<button
					class="btn"
					class:btn-primary={$ModeStore !== mode}
					class:btn-success={$ModeStore === mode}
					value={mode}
					on:click={() => {
						setMode(mode);
					}}
				>
					<span>
						{mode.toUpperCase()}
					</span>
				</button>
			{/each}
		</div>
	</div>
</ModalBase>
