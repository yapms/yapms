<script lang="ts">
	import { TossupCandidateStore } from '$lib/stores/Candidates';
	import { EditTossupModalStore, CandidateModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import ModalBase from '../ModalBase.svelte';

	function close() {
		$EditTossupModalStore.open = false;
		$CandidateModalStore.open = true;
	}

	function updateColor(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		$TossupCandidateStore.margins[0].color = event.currentTarget.value;
		$RegionsStore = $RegionsStore;
	}
</script>

<ModalBase title="Edit" store={EditTossupModalStore} onClose={close}>
	<div slot="content" class="flex justify-center gap-4">
		<input
			type="text"
			placeholder="Tossup Name"
			class="input input-sm input-bordered w-full max-w-xs"
			bind:value={$TossupCandidateStore.name}
		/>
		<input
			type="color"
			class="cursor-pointer"
			on:change={updateColor}
			value={$TossupCandidateStore.margins[0].color}
		/>
	</div>
</ModalBase>
