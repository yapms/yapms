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

<ModalBase store={EditTossupModalStore} onClose={close}>
	<label slot="title" class="flex flex-row gap-x-2 items-center">
		<span>Edit</span>
		<input
			type="text"
			class="input input-bordered w-full max-w-xs"
			bind:value={$TossupCandidateStore.name}
		/>
	</label>
	<div slot="content" class="form-control w-full max-w-xs flex flex-col gap-3">
		<h3 class="font-light text-lg">Color</h3>
		<input type="color" on:change={updateColor} value={$TossupCandidateStore.margins[0].color} />
	</div>
</ModalBase>
