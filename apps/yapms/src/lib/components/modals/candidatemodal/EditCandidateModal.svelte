<script lang="ts">
	import {
		CandidatesStore,
		SelectedCandidateStore,
		TossupCandidateStore
	} from '$lib/stores/Candidates';
	import { CandidateModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { EditCandidateModalStore } from '$lib/stores/Modals';
	import { get } from 'svelte/store';
	import ModalBase from '../ModalBase.svelte';

	$: open = $EditCandidateModalStore.open;
	$: id = open ? $EditCandidateModalStore.candidate.id : '';
	$: name = open ? $EditCandidateModalStore.candidate.name : '';
	$: newName = name;
	$: newColors = $EditCandidateModalStore.candidate.margins.map((margin) => {
		return margin.color;
	});

	function addColor() {
		newColors = [...newColors, '#000000'];
	}

	function removeColor() {
		if (newColors.length === 1) {
			return;
		}
		newColors = newColors.slice(0, newColors.length - 1);
	}

	function removeCandidate() {
		$CandidatesStore = $CandidatesStore.filter((candidate) => candidate.id !== id);
		$SelectedCandidateStore =
			$SelectedCandidateStore.id === id ? $TossupCandidateStore : $SelectedCandidateStore;

		$RegionsStore = $RegionsStore.map((region) => {
			const candidateToRemove = region.candidates.find(
				(candidate) => candidate.candidate.id === id
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
				candidates: region.candidates.filter((candidate) => candidate.candidate.id !== id)
			};
		});
		$EditCandidateModalStore.open = false;
		$CandidateModalStore.open = true;
	}

	function close() {
		$EditCandidateModalStore.open = false;
		$CandidateModalStore.open = true;
	}

	function confirm() {
		const candidateIndex = $CandidatesStore.findIndex((candidate) => candidate.id === id);
		$CandidatesStore[candidateIndex] = {
			...$CandidatesStore[candidateIndex],
			id,
			name: newName,
			margins: newColors.map((color) => {
				return {
					color
				};
			})
		};
		$EditCandidateModalStore.open = false;
		//Update selected candidate object
		if ($SelectedCandidateStore.id === id) {
			$SelectedCandidateStore = $CandidatesStore[candidateIndex];
		}
		//Update candidate object in region store
		const newRegions = get(RegionsStore);
		newRegions.forEach((region) => {
			for (const candidate of region.candidates) {
				if (candidate.candidate.id === id) {
					//Limit it to objects where candidate object present
					candidate.candidate = $CandidatesStore[candidateIndex];
				}
			}
		});
		$RegionsStore = newRegions;
		$CandidateModalStore.open = true;
	}
</script>

<ModalBase title="Edit {name}" store={EditCandidateModalStore} onClose={close}>
	<div slot="content">
		<div class="flex gap-1">
			<div class="form-control w-full max-w-xs flex flex-col gap-3">
				<h3 class="font-light text-lg">Name</h3>
				<input type="text" class="input input-bordered w-full max-w-xs" bind:value={newName} />
				<button class="btn btn-error" on:click={removeCandidate}>Remove Candidate</button>
			</div>
			<div class="divider divider-horizontal" />
			<div class="form-control w-full max-w-xs flex flex-col gap-3">
				<h3 class="font-light text-lg">Colors</h3>
				<div class="flex flex-row flex-wrap gap-2">
					{#each newColors as color, index}
						<input
							type="color"
							value={color}
							on:change={(change) => {
								newColors[index] = change.currentTarget.value;
							}}
						/>
					{/each}
				</div>
				<div class="btn-group btn-group-horizontal">
					<input
						type="button"
						class="btn btn-error btn-sm grow"
						on:click={removeColor}
						value="Remove"
					/>
					<input
						type="button"
						class="btn btn-success btn-sm grow"
						on:click={addColor}
						value="Add"
					/>
				</div>
			</div>
		</div>
	</div>
	<div slot="action">
		<button class="btn btn-success" on:click={confirm}>Update</button>
	</div>
</ModalBase>
