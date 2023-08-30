<script lang="ts">
	import Cog6Tooth from '$lib/icons/Cog6Tooth.svelte';
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import { CustomColorsStore } from '$lib/stores/CustomColors';
	import {
		AddCandidateModalStore,
		PresetColorsModalStore,
		AddCustomColorModalStore
	} from '$lib/stores/Modals';
	import ModalBase from '../ModalBase.svelte';

	let tab = 0;

	$: groups = [
		{
			name: 'Classic',
			colors: [
				{ name: 'Red', margins: ['#bf1d29', '#ff5865', '#ff8b98', '#cf8980'] },
				{ name: 'Blue', margins: ['#1c408c', '#577ccc', '#8aafff', '#949bb3'] },
				{ name: 'Green', margins: ['#1c8c28', '#50c85e', '#8aff97', '#7a997e'] },
				{ name: 'Yellow', margins: ['#e6b700', '#e8c84d', '#ffe78a', '#b8a252'] },
				{ name: 'Purple', margins: ['#822194', '#ae20c6', '#db14ff', '#a369ae'] }
			]
		},
		{
			name: 'Wikipedia',
			colors: [
				{
					name: 'Republican 1',
					margins: [
						'#a80000',
						'#c21b18',
						'#d72f30',
						'#d75d5d',
						'#e27f7f',
						'#ffb2b2',
						'#ffc8cd',
						'#ffe0ea'
					]
				},
				{
					name: 'Republican 2',
					margins: ['#800000', '#aa0000', '#d40000', '#cc2f4a', '#e27f90', '#f2b3be', '#ffccd0']
				},
				{
					name: 'Democrat 1',
					margins: [
						'#0d0596',
						'#3933e5',
						'#584cde',
						'#6674de',
						'#7996e2',
						'#a5b0ff',
						'#bdd3ff',
						'#dfeeff'
					]
				},
				{
					name: 'Democrat 2',
					margins: ['#002b84', '#234a99', '#466aad', '#6a89c2', '#8da8d6', '#b0c8eb', '#d3e7ff']
				}
			]
		},
		{
			name: 'Custom',
			colors: $CustomColorsStore.map((color, index) => {
				return {
					name: `Custom ${index + 1}`,
					margins: color
				};
			})
		}
	];

	$: currentGroup = groups[tab];

	function setTab(index: number) {
		tab = index;
	}

	function addCustomColor() {
		$AddCustomColorModalStore.open = true;
		$PresetColorsModalStore.open = false;
	}

	function removeCustomColor(index: number) {
		$CustomColorsStore = $CustomColorsStore.toSpliced(index, 1);
	}

	function close() {
		if ($AddCustomColorModalStore.open === true) {
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
		<div class="tabs pb-4 justify-center">
			{#each groups as group, index}
				<button
					class="tab tab-bordered tab-lg"
					class:tab-active={index === tab}
					on:click={() => setTab(index)}
				>
					{group.name}
				</button>
			{/each}
		</div>
	</div>
	<div slot="content">
		<div class="flex flex-col gap-2 flex-wrap justify-center">
			{#each currentGroup.colors as color, index}
				<div class="join max-w-full">
					{#if tab === 2}
						<button
							class="btn join-item btn-primary btn-lg"
							on:click={() => removeCustomColor(index)}><Cog6Tooth class="w-6 h-6" /></button
						>
					{/if}
					<button
						class="btn join-item btn-glass btn-lg flex-grow"
						on:click={() => confirm(color.margins)}
					>
						<div class="flex flex-col gap-2">
							<h3>{color.name}</h3>
							<div class="flex flex-row flex-wrap break-all gap-2">
								{#each color.margins as margin}
									<div
										class="outline outline-1 outline-white w-4 h-4 rounded-full"
										style:background-color={margin}
									/>
								{/each}
							</div>
						</div>
					</button>
					{#if tab === 2}
						<button class="btn join-item btn-error btn-lg" on:click={() => removeCustomColor(index)}
							><MinusCircle class="w-6 h-6" /></button
						>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<div slot="action">
		{#if currentGroup.name === 'Custom'}
			<button class="btn btn-success" on:click={addCustomColor}>Add</button>
		{/if}
	</div>
</ModalBase>
