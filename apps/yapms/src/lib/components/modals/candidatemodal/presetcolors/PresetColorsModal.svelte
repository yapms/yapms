<script lang="ts">
	import { CustomColorsStore } from '$lib/stores/CustomColors';
	import {
		AddCandidateModalStore,
		PresetColorsModalStore,
		AddCustomColorModalStore,
		EditCustomColorModalStore
	} from '$lib/stores/Modals';
	import ModalBase from '../../ModalBase.svelte';
	import ColorButton from '../customcolors/ColorButton.svelte';
	import PresetColorsHeader from './PresetColorsHeader.svelte';

	let tab = 0;

	function addCustomColor() {
		$AddCustomColorModalStore.open = true;
		$PresetColorsModalStore.open = false;
	}

	function removeCustomColor(index: number) {
		$CustomColorsStore.splice(index, 1);
		$CustomColorsStore = $CustomColorsStore;
	}

	function editCustomColor(index: number) {
		$PresetColorsModalStore.open = false;
		$EditCustomColorModalStore.open = true;
		$EditCustomColorModalStore.customColorIndex = index;
		$EditCustomColorModalStore.customColor = $CustomColorsStore.at(index) ?? [];
	}

	function close() {
		if ($AddCustomColorModalStore.open === true || $EditCustomColorModalStore.open === true) {
			return;
		}
		$PresetColorsModalStore.open = false;
		$AddCandidateModalStore.open = true;
	}

	function confirm(margins: string[]) {
		$PresetColorsModalStore.open = false;
		$AddCandidateModalStore = {
			open: true,
			newColors: margins
		};
	}
</script>

<ModalBase title="Select Preset Colors" store={PresetColorsModalStore} onClose={close}>
	<div slot="header">
		<div class="flex justify-center">
			<PresetColorsHeader bind:tab />
		</div>
	</div>
	<div slot="content">
		<div class="flex flex-col gap-2 overflow-hidden">
			{#if tab === 0}
				<ColorButton
					name="Red"
					colors={['#bf1d29', '#ff5865', '#ff8b98', '#cf8980']}
					onSelect={confirm}
				/>
				<ColorButton
					name="Blue"
					colors={['#1c408c', '#577ccc', '#8aafff', '#949bb3']}
					onSelect={confirm}
				/>
				<ColorButton
					name="Green"
					colors={['#1c8c28', '#50c85e', '#8aff97', '#7a997e']}
					onSelect={confirm}
				/>
				<ColorButton
					name="Yellow"
					colors={['#e6b700', '#e8c84d', '#ffe78a', '#b8a252']}
					onSelect={confirm}
				/>
				<ColorButton
					name="Purple"
					colors={['#822194', '#ae20c6', '#db14ff', '#a369ae']}
					onSelect={confirm}
				/>
			{:else if tab === 1}
				<ColorButton
					name="Republican 1"
					colors={[
						'#a80000',
						'#c21b18',
						'#d72f30',
						'#d75d5d',
						'#e27f7f',
						'#ffb2b2',
						'#ffc8cd',
						'#ffe0ea'
					]}
					onSelect={confirm}
				/>
				<ColorButton
					name="Republican 2"
					colors={['#800000', '#aa0000', '#d40000', '#cc2f4a', '#e27f90', '#f2b3be', '#ffccd0']}
					onSelect={confirm}
				/>
				<ColorButton
					name="Democrat 1"
					colors={[
						'#0d0596',
						'#3933e5',
						'#584cde',
						'#6674de',
						'#7996e2',
						'#a5b0ff',
						'#bdd3ff',
						'#dfeeff'
					]}
					onSelect={confirm}
				/>
				<ColorButton
					name="Democrat 2"
					colors={['#002b84', '#234a99', '#466aad', '#6a89c2', '#8da8d6', '#b0c8eb', '#d3e7ff']}
					onSelect={confirm}
				/>
			{:else if tab === 2}
				{#if $CustomColorsStore.length === 0}
					<button class="btn btn-success" on:click={addCustomColor}>Add Color</button>
				{/if}
				{#each $CustomColorsStore as colors, index}
					<ColorButton
						{colors}
						onSelect={confirm}
						onEdit={() => editCustomColor(index)}
						onDelete={() => removeCustomColor(index)}
					/>
				{/each}
			{/if}
		</div>
	</div>
	<div slot="action">
		{#if tab === 2 && $CustomColorsStore.length !== 0}
			<button class="btn btn-success" on:click={addCustomColor}>Add</button>
		{/if}
	</div>
</ModalBase>
