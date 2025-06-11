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
	import { preventNonNumericalInput, preventNonNumericalPaste } from '$lib/utils/inputValidation';
	import { reorder, useSortable } from '$lib/utils/sortableHook.svelte';
	import ModalBase from '../ModalBase.svelte';
	import GenerateShades from './shadegeneration/GenerateShades.svelte';

	let candidateIndex = $derived(
		$CandidatesStore.findIndex((candidate) => candidate.id === $EditCandidateModalStore.candidateId)
	);

	let colorList = $state<HTMLUListElement | undefined>(undefined);
	let colorToDelete = $state<number | undefined>(undefined);

	useSortable(() => colorList, {
		animation: 140,
		dragoverBubble: true,
		delay: 250,
		delayOnTouchOnly: true,
		onEnd(evt) {
			$CandidatesStore[candidateIndex].margins = reorder(
				$CandidatesStore[candidateIndex].margins,
				evt
			);
		}
	});

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

	function updateColors(newValue: { color: string }[]) {
		$CandidatesStore[candidateIndex].margins = newValue;
		$RegionsStore = $RegionsStore;
	}
</script>

<ModalBase title="Edit Candidate" store={EditCandidateModalStore} onClose={close}>
	<div slot="content" class="flex flex-col gap-4">
		<div class="flex flex-row gap-2 items-center w-full">
			<fieldset class="fieldset grow basis-75">
				<legend class="fieldset-legend">Name</legend>
				<input
					type="text"
					placeholder="Candidate Name"
					class="input input-sm"
					oninput={updateName}
					value={$CandidatesStore.at(candidateIndex)?.name}
				/>
			</fieldset>
			<fieldset class="fieldset grow">
				<legend class="fieldset-legend">Starting Value</legend>
				<input
					type="number"
					placeholder="Starting Value"
					class="input input-sm"
					onpaste={preventNonNumericalPaste}
					onkeypress={preventNonNumericalInput}
					oninput={updateDefaultValue}
					value={$CandidatesStore.at(candidateIndex)?.defaultCount !== 0
						? $CandidatesStore.at(candidateIndex)?.defaultCount
						: ''}
				/>
			</fieldset>
		</div>
		<ul class="flex flex-row flex-wrap gap-4 justify-center" bind:this={colorList}>
			{#each $CandidatesStore.at(candidateIndex)?.margins || [] as margin, index (margin)}
				<li class="join">
					<input
						class="join-item h-full"
						type="color"
						value={margin.color}
						onchange={(event) => updateColor(event, index)}
					/>
					<button
						class="btn btn-sm btn-primary join-item"
						class:btn-error={colorToDelete === index}
						onclick={() => {
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

		<GenerateShades colorUpdater={updateColors} />
	</div>
	<div slot="action" class="flex flex-grow justify-between">
		<button class="btn btn-error" onclick={deleteCandidate}>Delete Candidate</button>
		<button class="btn btn-success" onclick={addColor}>Add Color</button>
	</div>
</ModalBase>
