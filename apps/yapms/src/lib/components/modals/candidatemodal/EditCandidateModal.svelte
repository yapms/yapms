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
	import { SortableItem } from 'svelte-sortable-items';
	import { flip } from 'svelte/animate';

	$: candidateIndex = $CandidatesStore.findIndex(
		(candidate) => candidate.id === $EditCandidateModalStore.candidateId
	);

	let colorToDelete: number | undefined = undefined;

	function onMarginUpdate(colors: { color: string }[]) {
		$CandidatesStore[candidateIndex].margins = colors;
		$RegionsStore = $RegionsStore;
		colorToDelete = undefined;
	}

	function close() {
		$EditCandidateModalStore.open = false;
		$CandidateModalStore.open = true;
		colorToDelete = undefined;
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

	function updateName(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		$CandidatesStore[candidateIndex].name = event.currentTarget.value;
		colorToDelete = undefined;
	}

	function updateDefaultValue(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		$CandidatesStore[candidateIndex].defaultCount = Number(event.currentTarget.value);
		colorToDelete = undefined;
	}

	function updateColor(
		event: Event & { currentTarget: EventTarget & HTMLInputElement },
		index: number
	) {
		$CandidatesStore[candidateIndex].margins[index].color = event.currentTarget.value;
		$RegionsStore = $RegionsStore;
		colorToDelete = undefined;
	}

	function addColor() {
		$CandidatesStore[candidateIndex].margins = [
			...$CandidatesStore[candidateIndex].margins,
			{ color: '#000000' }
		];
		colorToDelete = undefined;
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
		colorToDelete = undefined;
	}
</script>

<ModalBase title="Edit" store={EditCandidateModalStore} onClose={close}>
	<div slot="content" class="flex flex-col gap-4">
		<div class="flex flex-row gap-2 items-center w-full">
			<fieldset class="fieldset grow basis-75">
				<legend class="fieldset-legend">Name</legend>
				<input
					type="text"
					placeholder="Candidate Name"
					class="input input-sm"
					on:input={updateName}
					value={$CandidatesStore.at(candidateIndex)?.name}
				/>
			</fieldset>
			<fieldset class="fieldset grow">
				<legend class="fieldset-legend">Starting Value</legend>
				<input
					type="number"
					placeholder="Starting Value"
					class="input input-sm"
					on:input={updateDefaultValue}
					value={$CandidatesStore.at(candidateIndex)?.defaultCount !== 0
						? $CandidatesStore.at(candidateIndex)?.defaultCount
						: ''}
				/>
			</fieldset>
		</div>
		<ul class="flex flex-row flex-wrap gap-4 justify-center">
			{#each $CandidatesStore.at(candidateIndex)?.margins || [] as margin, index (margin)}
				<div animate:flip={{ duration: 100 }}>
					<SortableItem
						propItemNumber={index}
						bind:propData={
							() => $CandidatesStore.at(candidateIndex)?.margins || [], (v) => onMarginUpdate(v)
						}
					>
						<li class="join">
							<input
								class="join-item"
								type="color"
								value={margin.color}
								on:change={(event) => updateColor(event, index)}
							/>
							<button
								class="btn btn-sm btn-primary join-item"
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
					</SortableItem>
				</div>
			{/each}
		</ul>
	</div>
	<div slot="action" class="flex flex-grow justify-between">
		<button class="btn btn-error" on:click={deleteCandidate}>Delete Candidate</button>
		<button class="btn btn-success" on:click={addColor}>Add Color</button>
	</div>
</ModalBase>
