<script lang="ts">
	import QuestionMarkCircle from '$lib/icons/QuestionMarkCircle.svelte';
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
					onclick={() => {
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
	<div slot="action" class="flex w-full gap-1 self-center items-center font-thin">
		<QuestionMarkCircle class="w-5 h-5" style="stroke-width: 0.75px" />
		<span
			>Press <kbd class="kbd kbd-sm">f</kbd>, <kbd class="kbd kbd-sm">s</kbd>,
			<kbd class="kbd kbd-sm">e</kbd>,
			<kbd class="kbd kbd-sm">d</kbd>, or <kbd class="kbd kbd-sm">l</kbd> to quick select</span
		>
	</div>
</ModalBase>
