<script lang="ts">
	import { CandidatesStore } from '$lib/stores/Candidates';
	import {
		CandidateModalStore,
		AddCandidateModalStore,
		PresetColorsModalStore,
		PresetColorsModalSelectedStore
	} from '$lib/stores/Modals';
	import { v4 as uuidv4 } from 'uuid';
	import ModalBase from '../ModalBase.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { SortableItem } from 'svelte-sortable-items';
	import { flip } from 'svelte/animate';

	let newName = 'New Candidate';
	let newColors = ['#000000'];

	PresetColorsModalSelectedStore.subscribe((presetColors) => {
		if (presetColors.length !== 0) newColors = presetColors;
	});

	function addColor() {
		newColors = [...newColors, '#000000'];
	}

	function removeColor(index: number) {
		if (newColors.length > 1) {
			newColors = newColors.toSpliced(index, 1);
		}
	}

	function close() {
		if ($PresetColorsModalStore.open === true) {
			return;
		}
		$AddCandidateModalStore.open = false;
		$CandidateModalStore.open = true;
		newName = 'New Candidate';
		newColors = ['#000000'];
	}

	function selectPresetColor() {
		$PresetColorsModalStore.open = true;
		$AddCandidateModalStore.open = false;
	}

	function confirm() {
		CandidatesStore.update((candidates) => [
			...candidates,
			{
				id: uuidv4(),
				defaultCount: 0,
				name: newName,
				margins: newColors.map((color) => {
					return { color };
				})
			}
		]);
		close();
	}
</script>

<ModalBase title="Add Candidate" store={AddCandidateModalStore} onClose={close}>
	<div slot="content" class="flex flex-col gap-4">
		<input
			type="text"
			placeholder="Candidate Name"
			class="input input-sm w-full"
			bind:value={newName}
		/>
		<ul class="flex flex-row flex-wrap gap-4 justify-center">
			{#each newColors as color, index (index)}
				<div animate:flip={{ duration: 100 }}>
					<SortableItem propItemNumber={index} bind:propData={newColors}>
						<li class="join">
							<input
								class="join-item"
								type="color"
								value={color}
								on:change={(change) => {
									newColors[index] = change.currentTarget.value;
								}}
							/>
							<button
								class="btn btn-sm btn-error join-item"
								on:click={() => removeColor(index)}
								disabled={newColors.length === 1}
							>
								<Trash class="w-6 h-6" />
							</button>
						</li>
					</SortableItem>
				</div>
			{/each}
		</ul>
	</div>
	<div slot="action" class="flex w-full gap-2">
		<button class="btn btn-secondary" on:click={selectPresetColor}> Preset Colors </button>
		<button class="btn btn-primary" on:click={addColor}>Add Color</button>
		<div class="grow"></div>
		<button class="btn btn-success" on:click={confirm}>Add Candidate</button>
	</div>
</ModalBase>
