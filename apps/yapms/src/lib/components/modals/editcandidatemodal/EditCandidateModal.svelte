<script lang="ts">
	import { CandidatesStore, SelectedCandidateStore, TossupCandidateStore } from '$lib/stores/Candidates';
	import { RegionsStore } from '$lib/stores/Regions';
	import { EditCandidateModalStore } from '$lib/stores/Modals';
	import { get } from 'svelte/store';
	import ModalTitle from '../ModalTitle.svelte';

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
		$SelectedCandidateStore = $SelectedCandidateStore.id === id ?
			$TossupCandidateStore : $SelectedCandidateStore;
		$RegionsStore = $RegionsStore.map((region) => 
			region.candidates[0].candidate.id === id ?
			{
				...region,
				candidates: [
					{
						candidate: $TossupCandidateStore,
						count: region.value,
						margin: 0
					}
				]
			} : region
		);
		$EditCandidateModalStore.open = false;
	}

	function cancel() {
		$EditCandidateModalStore.open = false;
	}

	function confirm() {
		const candidateIndex = $CandidatesStore.findIndex((candidate) => candidate.id === id);
		$CandidatesStore[candidateIndex] = {
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
			if (region.candidates[0].candidate.id === id) {
				//Limit it to objects where candidate object present
				region.candidates[0].candidate = $CandidatesStore[candidateIndex];
			}
		});
		$RegionsStore = newRegions;
	}
</script>

<input type="checkbox" class="modal-toggle" checked={open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<ModalTitle title="Edit {name}" />
		<div class="flex gap-1">
			<div class="form-control w-full max-w-xs flex flex-col gap-3">
				<h3 class="font-light text-lg">Name</h3>
				<input type="text" class="input input-bordered w-full max-w-xs" bind:value={newName} />
				<input type="button" class="btn btn-error" value="Remove Candidate" on:click={removeCandidate} />
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
		<div class="modal-action">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label for="my-modal" class="btn btn-primary" on:click={cancel}>No</label>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label for="my-modal" class="btn btn-success" on:click={confirm}>Update</label>
		</div>
	</div>
</div>
