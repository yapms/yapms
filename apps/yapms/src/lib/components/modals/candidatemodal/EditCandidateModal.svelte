<script lang="ts">
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import {
		CandidatesStore,
		SelectedCandidateStore,
		TossupCandidateStore
	} from '$lib/stores/Candidates';
	import { CandidateModalStore } from '$lib/stores/Modals';
	import { EditCandidateModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import ModalBase from '../ModalBase.svelte';

	function deleteCandidate() {
		$CandidatesStore = $CandidatesStore.filter(
			(candidate) => candidate.id !== $EditCandidateModalStore.candidateId
		);
		$SelectedCandidateStore =
			$SelectedCandidateStore.id === $EditCandidateModalStore.candidateId
				? $TossupCandidateStore
				: $SelectedCandidateStore;

		$RegionsStore = $RegionsStore.map((region) => {
			const candidateToRemove = region.candidates.find(
				(candidate) => candidate.candidate.id === $EditCandidateModalStore.candidateId
			);
			if (candidateToRemove === undefined) {
				return region;
			}

			const tossupCandidate = region.candidates.find(
				(candidate) => candidate.candidate.id === $TossupCandidateStore.id
			);
			if (tossupCandidate === undefined) {
				return {
					...region,
					candidates: [{ candidate: $TossupCandidateStore, count: region.value, margin: 0 }]
				};
			}

			tossupCandidate.count += candidateToRemove.count;
			return {
				...region,
				candidates: region.candidates.filter(
					(candidate) => candidate.candidate.id !== $EditCandidateModalStore.candidateId
				)
			};
		});
		$EditCandidateModalStore.open = false;
		$CandidateModalStore.open = true;
	}

	function close() {
		$EditCandidateModalStore.open = false;
		$CandidateModalStore.open = true;
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
	}

	function addColor() {
		$CandidatesStore[candidateIndex].margins = [
			...$CandidatesStore[candidateIndex].margins,
			{ color: '#000000' }
		];
	}

	function removeColor(index: number) {
		$CandidatesStore[candidateIndex].margins = $CandidatesStore[candidateIndex].margins.toSpliced(
			index,
			1
		);
		$RegionsStore = $RegionsStore;
	}
</script>

<ModalBase store={EditCandidateModalStore} onClose={close}>
	<div slot="title">
		<label class="flex flex-row gap-x-2 items-center">
			<span>Edit</span>
			<input
				type="text"
				class="input input-bordered w-full max-w-xs"
				on:input={updateName}
				value={$CandidatesStore.at(candidateIndex)?.name}
			/>
		</label>
	</div>
	<div slot="content">
		<div class="flex flex-row flex-wrap gap-4">
			{#each $CandidatesStore.at(candidateIndex)?.margins || [] as margin, index}
				<div class="input-group w-min">
					<input
						type="color"
						value={margin.color}
						on:change={(event) => updateColor(event, index)}
					/>
					{#if $CandidatesStore.at(candidateIndex)?.margins.length !== 1}
						<button class="btn btn-sm btn-error" on:click={() => removeColor(index)}>
							<MinusCircle class="w-6 h-6" />
						</button>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<div slot="action" class="flex flex-grow justify-between">
		<button class="btn btn-error" on:click={deleteCandidate}>Delete Candidate</button>
		<button class="btn btn-success" on:click={addColor}>Add Color</button>
	</div>
</ModalBase>
