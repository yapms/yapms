<script lang="ts">
	import { AddCandidateModalStore, PresetColorsModalStore } from '$lib/stores/Modals';
	import ModalBase from '../ModalBase.svelte';

	let tab = 0;

	const groups = [
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
		}
	];

	$: currentGroup = groups[tab];

	function setTab(index: number) {
		tab = index;
	}

	function close() {
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
	<div slot="content">
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

		<div class="flex flex-row gap-3 flex-wrap justify-center">
			{#each currentGroup.colors as color}
				<button class="btn btn-lg" on:click={() => confirm(color.margins)}>
					<div class="flex flex-col gap-2">
						<h3>{color.name}</h3>
						<div class="flex flex-row gap-2">
							{#each color.margins as margin}
								<div
									class="outline outline-1 outline-white w-4 h-4 rounded-full"
									style:background-color={margin}
								/>
							{/each}
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>
</ModalBase>
