<script lang="ts">
	import { CustomColorsStore } from '$lib/stores/CustomColors';
	import {
		PresetColorsModalStore,
		AddCustomColorModalStore,
		EditCustomColorModalStore
	} from '$lib/stores/Modals';
	import NewModalBase from '../../NewModalBase.svelte';
	import ColorButton from '../customcolors/ColorButton.svelte';
	import PresetColorsHeader from './PresetColorsHeader.svelte';

	let {
		open = $bindable(),
		onSelectColors
	}: {
		open: boolean;
		onSelectColors: (margins: string[]) => void;
	} = $props();

	let tab = $state(0);
	let selected: string | undefined = $state(undefined);

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

	function onSelect(name: string) {
		selected = name;
	}

	function onConfirm(colors: string[]) {
		onSelectColors(colors);
	}

	function close() {
		open = false;
	}
</script>

<NewModalBase title="Select Preset Colors" {open} onClose={close}>
	{#snippet header()}
		<div class="flex justify-center">
			<PresetColorsHeader bind:tab />
		</div>
	{/snippet}
	{#snippet content()}
		<div class="flex flex-col gap-2 overflow-hidden">
			{#if tab === 0}
				<ColorButton
					name="Red"
					colors={['#bf1d29', '#ff5865', '#ff8b98', '#cf8980']}
					selected={selected === 'Red'}
					{onSelect}
					{onConfirm}
				/>
				<ColorButton
					name="Blue"
					colors={['#1c408c', '#577ccc', '#8aafff', '#949bb3']}
					selected={selected === 'Blue'}
					{onSelect}
					{onConfirm}
				/>
				<ColorButton
					name="Green"
					colors={['#1c8c28', '#50c85e', '#8aff97', '#7a997e']}
					selected={selected === 'Green'}
					{onSelect}
					{onConfirm}
				/>
				<ColorButton
					name="Yellow"
					colors={['#e6b700', '#e8c84d', '#ffe78a', '#b8a252']}
					selected={selected === 'Yellow'}
					{onSelect}
					{onConfirm}
				/>
				<ColorButton
					name="Purple"
					colors={['#822194', '#ae20c6', '#db14ff', '#a369ae']}
					selected={selected === 'Purple'}
					{onSelect}
					{onConfirm}
				/>
			{:else if tab === 1}
				<ColorButton
					name="Republican Presidential"
					colors={['#800000', '#aa0000', '#d40000', '#cc2f4a', '#e27f90', '#f2b3be', '#ffccd0']}
					selected={selected === 'Republican Presidential'}
					{onSelect}
					{onConfirm}
				/>
				<ColorButton
					name="Republican Downballot"
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
					selected={selected === 'Republican Downballot'}
					{onSelect}
					{onConfirm}
				/>
				<ColorButton
					name="Democrat Presidential"
					colors={['#002b84', '#234a99', '#466aad', '#6a89c2', '#8da8d6', '#b0c8eb', '#d3e7ff']}
					selected={selected === 'Democrat Presidential'}
					{onSelect}
					{onConfirm}
				/>
				<ColorButton
					name="Democrat Downballot"
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
					selected={selected === 'Democrat Downballot'}
					{onSelect}
					{onConfirm}
				/>
				<ColorButton
					name="Libertarian"
					colors={['#ce9b1e', '#deb02a', '#f1c92a', '#ffdd55', '#ffeeaa']}
					selected={selected === 'Libertarian'}
					{onSelect}
					{onConfirm}
				/>
				<ColorButton
					name="Independent"
					colors={[
						'#555555',
						'#737373',
						'#969696',
						'#bdbdbd',
						'#d9d9d9',
						'#e6e6e6',
						'#ededed',
						'#f5f5f5',
						'#fafafa'
					]}
					selected={selected === 'Independent'}
					{onSelect}
					{onConfirm}
				/>
				<ColorButton
					name="Write-in"
					colors={[
						'#165016',
						'#217821',
						'#2ca02c',
						'#37c837',
						'#5fd35f',
						'#87de87',
						'#aae5aa',
						'#c0f0c0',
						'#d2f7d2',
						'#e5ffe5'
					]}
					selected={selected === 'Write-in'}
					{onSelect}
					{onConfirm}
				/>
				<ColorButton
					name="Whig"
					colors={['#8c2d04', '#cc4c02', '#ec7014', '#fe9929', '#fed463', '#fee391', '#fef4b4']}
					selected={selected === 'Whig'}
					{onSelect}
					{onConfirm}
				/>
				<ColorButton
					name="Level of support"
					colors={[
						'#2b2457',
						'#28497c',
						'#47729e',
						'#7d9cbb',
						'#b6c8d9',
						'#ebeeed',
						'#dedebd',
						'#bcbc83',
						'#8b8b54',
						'#5d5d2d',
						'#32320c'
					]}
					selected={selected === 'Level of support'}
					{onSelect}
					{onConfirm}
				/>
			{:else if tab === 2}
				{#if $CustomColorsStore.length === 0}
					<button class="btn btn-success" onclick={addCustomColor}>Add Color</button>
				{/if}
				{#each $CustomColorsStore as colors, index}
					<ColorButton
						name={index.toString()}
						hideName={true}
						{colors}
						selected={selected === index.toString()}
						{onSelect}
						{onConfirm}
						onEdit={() => editCustomColor(index)}
						onDelete={() => removeCustomColor(index)}
					/>
				{/each}
			{/if}
		</div>
	{/snippet}
	{#snippet action()}
		{#if tab === 2 && $CustomColorsStore.length !== 0}
			<button class="btn btn-success" onclick={addCustomColor}>Add</button>
		{/if}
	{/snippet}
</NewModalBase>
