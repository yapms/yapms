<script lang="ts">
	import { page } from '$app/stores';
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import SideBar from '$lib/components/sidebar/SideBar.svelte';
	import EditCandidateModal from '$lib/components/modals/editcandidatemodal/EditCandidateModal.svelte';
	import ChartBar from '$lib/components/chartbar/ChartBar.svelte';
	import type { PanZoom } from 'panzoom';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import MapModal from '$lib/components/modals/mapmodal/MapModal.svelte';
	import CandidateBoxContainer from '$lib/components/candidatebox/CandidateBoxContainer.svelte';
	import loadRegions from './initialize/LoadRegions';
	import ClearMapModal from '$lib/components/modals/clearmapmodal/ClearMapModal.svelte';
	import applyPanZoom from './initialize/ApplyPanZoom';

	const imports = {
		usa: () => import('$lib/assets/usa.svg?raw'),
		nz: () => import('$lib/assets/nz.svg?raw')
	};

	let fillKeyPressed = false;

	let currentMap = 'usa' as keyof typeof imports;
	let mapBind: HTMLDivElement;
	let panZoom: PanZoom | undefined;

	let sidebar = {
		open: true
	};

	let chartbar = {
		open: true,
		position: 'left' as 'left' | 'bottom'
	};

	onMount(() => {
		themeChange(false);
	});

	function toggleSideBar() {
		sidebar = {
			open: !sidebar.open
		};
	}

	function toggleChartPosition() {
		chartbar = {
			open: chartbar.open,
			position: chartbar.position === 'left' ? 'bottom' : 'left'
		};
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.code === 'KeyF') {
			//Fill button
			fillKeyPressed = true;
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		if (e.code === 'KeyF') {
			//Fill button
			fillKeyPressed = false;
		}
	}

	function setupMap(node: HTMLDivElement) {
		panZoom = applyPanZoom(node);
		loadRegions(node);
	}
</script>

<!--Tell Svelte to use the handleKeyDown function when any key pressed and handleKeyUp when key released-->
<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<div class="flex flex-col h-full">
	<NavBar />
	<div class="flex flex-row h-full">
		<div
			class="flex flex-grow basis-9/12"
			class:flex-row={chartbar.position === 'left'}
			class:flex-col-reverse={chartbar.position === 'bottom'}
		>
			<div class="flex basis-3/12 justify-center items-center">
				<ChartBar />
			</div>
			{#if chartbar.position === 'bottom'}
				<div class="divider divider-vertical mb-0 mt-0 h-0" />
			{:else if chartbar.position === 'left'}
				<div class="divider divider-horizontal ml-0 mr-0 w-0" />
			{/if}
			<div class="basis-9/12 overflow-hidden">
				<CandidateBoxContainer />
				{#await imports[currentMap]() then module}
					<div bind:this={mapBind} use:setupMap class="overflow-hidden h-full">
						{@html module.default}
					</div>
				{/await}
			</div>
		</div>

		<SideBar open={sidebar.open} path={$page.url.pathname} />
	</div>
</div>

<ClearMapModal />

<EditCandidateModal />

<MapModal />
