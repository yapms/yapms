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
	import GenerateShades from './shadegeneration/GenerateShades.svelte';
	import Rotate from '$lib/icons/Rotate.svelte';
	import { flip } from 'svelte/animate';
	import PresetColorsModal from './presetcolors/PresetColorsModal.svelte';

	let newName = $state<string>('New Candidate');
	let newDefaultValue = $state<number>(0);

	let newColors = $state([{ color: '#000000' }]);

	let colorList = $state<HTMLUListElement | undefined>(undefined);
	let presetColorsModalIsOpen = $state(false);

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

	function setPresetColors(margins: string[]) {
		newColors = margins.map((margin) => {
			return {
				color: margin
			};
		});
		presetColorsModalIsOpen = false;
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
		newDefaultValue = 0;
		newColors = [{ color: '#000000' }];
	}

	function openPresetColorsModal() {
		presetColorsModalIsOpen = true;
	}

	function confirm() {
		CandidatesStore.update((candidates) => [
			...candidates,
			{
				id: uuidv4(),
				defaultCount: newDefaultValue,
				name: newName,
				margins: newColors.map((color) => {
					return { color: color.color };
				})
			}
		]);
		close();
	}

	function updateColors(newValue: { color: string }[]) {
		newColors = newValue;
	}

	function flipColors() {
		newColors.reverse();
	}
</script>

<ModalBase title="Add Candidate" store={AddCandidateModalStore} onClose={close}>
	<div slot="content" class="flex flex-col gap-4">
		<div class="flex flex-row gap-2 items-center w-full">
			<fieldset class="fieldset grow basis-75">
				<legend class="fieldset-legend">Name</legend>
				<input
					type="text"
					placeholder="Candidate Name"
					class="input input-sm"
					bind:value={newName}
				/>
			</fieldset>
			<fieldset class="fieldset grow">
				<legend class="fieldset-legend">Starting Value</legend>
				<input
					type="number"
					placeholder="Starting Value"
					class="input input-sm"
					bind:value={newDefaultValue}
				/>
			</fieldset>
		</div>

		<fieldset class="fieldset">
			<div class="flex gap-1 items-end">
				<legend class="fieldset-legend">Colors</legend>
				<button class="btn btn-xs btn-circle btn-ghost" onclick={flipColors}>
					<Rotate class="size-4"></Rotate>
				</button>
			</div>

			<ul class="flex flex-row flex-wrap gap-4 justify-center" bind:this={colorList}>
				{#each newColors as color, index (color)}
					<li class="join" animate:flip={{ duration: 200 }}>
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
		</fieldset>

		<GenerateShades colorUpdater={updateColors} />
	</div>

	<div slot="action" class="flex w-full gap-2">
		<button class="btn btn-primary" onclick={openPresetColorsModal}> Preset Colors </button>
		<button class="btn btn-primary" onclick={addColor}>Add Color</button>
		<div class="grow"></div>
		<button class="btn btn-success" onclick={confirm}>Add Candidate</button>
	</div>
</ModalBase>

<PresetColorsModal bind:open={presetColorsModalIsOpen} onSelectColors={setPresetColors} />
