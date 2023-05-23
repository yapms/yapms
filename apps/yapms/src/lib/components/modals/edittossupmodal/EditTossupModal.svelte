<script lang="ts">
	import { SelectedCandidateStore, TossupCandidateStore } from '$lib/stores/Candidates';
	import { EditTossupModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/Regions';
	import { get } from 'svelte/store';
	import ModalBase from '../ModalBase.svelte';

	$: open = $EditTossupModalStore.open;
	$: name = open ? $TossupCandidateStore.name : '';
	$: color = open ? $TossupCandidateStore.margins[0].color : '';

	$: newName = name;
	$: newColor = color;

	function close() {
		$EditTossupModalStore.open = false;
	}

	function confirm() {
		$TossupCandidateStore = {
			...$TossupCandidateStore,
			name: newName,
			margins: [{ color: newColor }]
		};
		if ($SelectedCandidateStore.id === $TossupCandidateStore.id) {
			$SelectedCandidateStore = $TossupCandidateStore;
		}
		const newRegions = get(RegionsStore);
		newRegions.forEach((region) => {
			if (region.candidates[0].candidate.id === $TossupCandidateStore.id) {
				region.candidates[0].candidate = $TossupCandidateStore;
			}
		});
		$RegionsStore = newRegions;
		$EditTossupModalStore.open = false;
	}
</script>

<ModalBase title="Edit {name}" open={$EditTossupModalStore.open}>
	<div slot="content">
		<div class="flex gap-1">
			<div class="form-control w-full max-w-xs flex flex-col gap-3">
				<h3 class="font-light text-lg">Name</h3>
				<input type="text" class="input input-bordered w-full max-w-xs" bind:value={newName} />
			</div>
			<div class="divider divider-horizontal" />
			<div class="form-control w-full max-w-xs flex flex-col gap-3">
				<h3 class="font-light text-lg">Color</h3>
				<input type="color" bind:value={newColor} />
			</div>
		</div>
		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}>No</button>
			<button class="btn btn-success" on:click={confirm}>Update</button>
		</div>
	</div>
</ModalBase>
