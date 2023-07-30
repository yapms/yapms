<script lang="ts">
	import { CandidatesStore } from '$lib/stores/Candidates';
	import {
		CandidateModalStore,
		AddCandidateModalStore,
		EditCandidateModalStore,
		PresetColorsModalStore
	} from '$lib/stores/Modals';
	import { v4 as uuidv4 } from 'uuid';
	import ModalBase from '../ModalBase.svelte';
	import { calculateLumaHEX } from '$lib/utils/luma';
	import type Candidate from '$lib/types/Candidate';

	let newName = '';

	function addColor() {
		$AddCandidateModalStore.newColors = [...$AddCandidateModalStore.newColors, '#000000'];
	}

	function removeColor() {
		if ($AddCandidateModalStore.newColors.length > 1) {
			$AddCandidateModalStore.newColors = $AddCandidateModalStore.newColors.slice(
				0,
				$AddCandidateModalStore.newColors.length - 1
			);
		}
	}

	function close() {
		AddCandidateModalStore.set({
			open: false,
			newColors: ['#000000']
		});
		$CandidateModalStore.open = true;
		newName = '';
	}

	function selectPresetColor() {
		AddCandidateModalStore.set({
			...$AddCandidateModalStore,
			open: false
		});
		PresetColorsModalStore.set({
			open: true
		});
	}

	function openEditCandidateModal(candidate: Candidate) {
		$AddCandidateModalStore.open = false;
		EditCandidateModalStore.set({
			candidate,
			open: true
		});
	}

	function confirm() {
		CandidatesStore.update((candidates) => [
			...candidates,
			{
				id: uuidv4(),
				defaultCount: 0,
				name: newName,
				margins: $AddCandidateModalStore.newColors.map((color) => {
					return { color };
				})
			}
		]);
		close();
	}
</script>

<ModalBase title="Add Candidate" open={$AddCandidateModalStore.open}>
	<div slot="content">
		<div class="flex">
			<div class="form-control w-full max-w-xs flex flex-col gap-3">
				<h3 class="font-light text-lg">Name</h3>
				<input type="text" class="input input-bordered w-full max-w-xs" bind:value={newName} />
				<input
					type="button"
					class="btn btn-primary"
					value="Preset Colors"
					on:click={selectPresetColor}
				/>
			</div>

			<div class="divider divider-horizontal" />

			<div class="form-control w-full max-w-xs flex flex-col gap-3">
				<h3 class="font-light text-lg">Colors</h3>
				<div class="flex flex-row flex-wrap gap-2">
					{#each $AddCandidateModalStore.newColors as color, index}
						<input
							type="color"
							value={color}
							on:change={(change) => {
								$AddCandidateModalStore.newColors[index] = change.currentTarget.value;
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
		<div class="divider" />
		<div class="flex gap-2 mt-4 flex-wrap justify-center">
			{#each $CandidatesStore as candidate}
				<button
					class="btn btn-ghost"
					style:background-color={candidate.margins[0].color}
					style:color={calculateLumaHEX(candidate.margins[0].color) > 0.5 ? 'black' : 'white'}
					on:click={() => openEditCandidateModal(candidate)}
				>
					{candidate.name}
				</button>
			{/each}
		</div>
	</div>
	<div slot="action">
		<button class="btn btn-primary" on:click={close}> No </button>
		<button class="btn btn-success" on:click={confirm}> Add </button>
	</div>
</ModalBase>
