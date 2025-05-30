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
	import { reorder, useSortable } from '$lib/utils/sortableHook.svelte';

	let newName = $state<string>('New Candidate');
	let newColors = $state([{ color: '#000000' }]);

	let colorList = $state<HTMLUListElement | undefined>(undefined);

	useSortable(() => colorList, {
		animation: 140,
		dragoverBubble: true,
		delay: 250,
		delayOnTouchOnly: true,
		onEnd(evt) {
			newColors = reorder(newColors, evt);
		}
	});

	PresetColorsModalSelectedStore.subscribe((presetColors) => {
		if (presetColors.length !== 0)
			newColors = presetColors.map((presetColor) => {
				return { color: presetColor };
			});
	});
	function addColor() {
		newColors = [...newColors, { color: '#000000' }];
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
		newColors = [{ color: '#000000' }];
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
					return { color: color.color };
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
		<ul class="flex flex-row flex-wrap gap-4 justify-center" bind:this={colorList}>
			{#each newColors as color, index (color)}
				<li class="join">
					<input
						class="join-item h-full"
						type="color"
						value={color.color}
						onchange={(change) => {
							newColors[index].color = change.currentTarget.value;
						}}
					/>
					<button
						class="btn btn-sm btn-error join-item"
						onclick={() => removeColor(index)}
						disabled={newColors.length === 1}
					>
						<Trash class="w-6 h-6" />
					</button>
				</li>
			{/each}
		</ul>
	</div>
	<div slot="action" class="flex w-full gap-2">
		<button class="btn btn-secondary" onclick={selectPresetColor}> Preset Colors </button>
		<button class="btn btn-primary" onclick={addColor}>Add Color</button>
		<div class="grow"></div>
		<button class="btn btn-success" onclick={confirm}>Add Candidate</button>
	</div>
</ModalBase>
