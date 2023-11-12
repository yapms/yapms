<script lang="ts">
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import {
		CandidatesStore,
		SelectedCandidateStore,
		TossupCandidateStore
	} from '$lib/stores/Candidates';
	import { CandidateModalStore } from '$lib/stores/Modals';
	import { EditCandidateModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import ModalBase from '../ModalBase.svelte';

	let colorToDelete: number | undefined = undefined;

	function close() {
		$EditCandidateModalStore.open = false;
		$CandidateModalStore.open = true;
	}

	function deleteCandidate() {
		$CandidatesStore = $CandidatesStore.filter(
			(candidate) => candidate.id !== $EditCandidateModalStore.candidateId
		);
		$SelectedCandidateStore =
			$SelectedCandidateStore.id === $EditCandidateModalStore.candidateId
				? $TossupCandidateStore
				: $SelectedCandidateStore;
		$RegionsStore = $RegionsStore;
		close();
	}

	$: candidateIndex = $CandidatesStore.findIndex(
		(candidate) => candidate.id === $EditCandidateModalStore.candidateId
	);

	function updateName(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		$CandidatesStore[candidateIndex].name = event.currentTarget.value;
	}

	function updateColor(
		event: Event & { currentTarget: EventTarget & HTMLInputElement },
		index: number
	) {
		$CandidatesStore[candidateIndex].margins[index].color = event.currentTarget.value;
		$RegionsStore = $RegionsStore;
	}

	function addColor() {
		$CandidatesStore[candidateIndex].margins = [
			...$CandidatesStore[candidateIndex].margins,
			{ color: '#000000' }
		];
	}

	function confirmRemove(index: number) {
		colorToDelete = index;
	}

	function removeColor(index: number) {
		colorToDelete = undefined;
		$CandidatesStore[candidateIndex].margins = $CandidatesStore[candidateIndex].margins.toSpliced(
			index,
			1
		);
		$RegionsStore = $RegionsStore;
	}
</script>

<ModalBase store={EditCandidateModalStore} onClose={close}>
	<label slot="title" class="flex flex-row gap-x-2 items-center">
		<span>Edit</span>
		<input
			type="text"
			class="input input-sm input-bordered"
			on:input={updateName}
			value={$CandidatesStore.at(candidateIndex)?.name}
		/>
	</label>
	<ul slot="content" class="flex flex-row flex-wrap gap-4 justify-center">
		{#each $CandidatesStore.at(candidateIndex)?.margins || [] as margin, index}
			<li class="input-group w-min">
				<input type="color" value={margin.color} on:change={(event) => updateColor(event, index)} />
				<button
					class="btn btn-sm btn-primary"
					class:btn-error={colorToDelete === index}
					on:click={() => {
						if (index === colorToDelete) {
							removeColor(index);
						} else {
							confirmRemove(index);
						}
					}}
					disabled={$CandidatesStore.at(candidateIndex)?.margins.length === 1}
				>
					{#if colorToDelete === index}
						<Trash class="w-6 h-6" />
					{:else}
						<MinusCircle class="w-6 h-6" />
					{/if}
				</button>
			</li>
		{/each}
	</ul>
	<div slot="action" class="flex flex-grow justify-between">
		<button class="btn btn-error" on:click={deleteCandidate}>Delete Candidate</button>
		<button class="btn btn-success" on:click={addColor}>Add Color</button>
	</div>
</ModalBase>
