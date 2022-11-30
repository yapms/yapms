<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ConfirmModal from '$lib/components/modals/common/ConfirmModal.svelte';
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import SideBar from '$lib/components/sidebar/SideBar.svelte';
	import CandidateBox from '$lib/components/candidatebox/CandidateBox.svelte';
	import type Candidate from '$lib/types/Candidate';
	import EditCandidateModal from '$lib/components/modals/editcandidatemodal/EditCandidateModal.svelte';
	import ChartBar from '$lib/components/chartbar/ChartBar.svelte';
	import EditStateModal from '$lib/components/modals/editstatemodal/EditStateModal.svelte';
	import type { Mode } from '$lib/types/Mode';
	import type State from '$lib/types/State';
	import { applyPanZoom, initializeMap, setupRegions, setupButtons } from './initialize';
	import type { PanZoom } from 'panzoom';
	import { _fillRegion, _editRegion, _refreshRegions, _clearRegions } from './logic';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import MapModal from '$lib/components/modals/mapmodal/MapModal.svelte';

	const imports = {
		usa: () => import('$lib/assets/usa.svg?raw'),
		nz: () => import('$lib/assets/nz.svg?raw')
	};

	let mode: Mode = 'fill';
	let fillKeyPressed = false;

	let currentMap = 'usa' as keyof typeof imports;
	let mapBind: HTMLDivElement;
	let panZoom: PanZoom | undefined;

	let selectedCandidateId = 0;

	let candidates: Candidate[] = [
		{ id: -1, name: 'Tossup', margins: [{ color: '#cccccc', count: 0 }] },
		{
			id: 0,
			name: 'Joe Biden',
			margins: [
				{ color: '#00ff00', count: 0 },
				{ color: '#0000ff', count: 0 },
				{ color: '#ff0000', count: 0 }
			]
		},
		{ id: 1, name: 'Donald Trump', margins: [{ color: '#ff0000', count: 0 }] }
	];

	let sidebar = {
		open: true
	};

	let chartbar = {
		open: true,
		position: 'left' as 'left' | 'bottom'
	};

	let confirmModal = {
		open: false,
		title: '',
		message: '',
		onConfirm: () => {
			console.log('default');
		}
	};

	let editCandidateModal = {
		open: false,
		candidate: { id: -1, name: '', margins: [] } as Candidate,
		onConfirm: (candidateId: number, name: string, colors: string[]) => {
			editCandidate(candidateId, name, colors);
			closeEditCandidateModal();
		}
	};

	let editStateModal = {
		open: false,
		state: {
			shortName: '',
			longName: '',
			value: 0
		},
		onConfirm: (values: { newValue: number }) => {}
	};

	let mapModal = {
		open: false
	};

	onMount(() => {
		themeChange(false);
	});

	function setSelectedCandidate(candidate: Candidate) {
		selectedCandidateId = candidate.id;
	}

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

	function openGoHomeModal() {
		confirmModal = {
			open: true,
			title: 'Return Home?',
			message: 'You will lose all your current progress.',
			onConfirm: () => {
				goto('/');
			}
		};
	}

	function openClearMapModal() {
		confirmModal = {
			open: true,
			title: 'Confirm Clear',
			message: 'You will lose all your current progress.',
			onConfirm: () => {
				candidates = _clearRegions(mapBind, candidates);
				closeConfirm();
			}
		};
	}

	function openMapModal() {
		mapModal = {
			open: true
		};
	}

	function closeMapModal() {
		mapModal = {
			open: false
		};
	}

	function closeConfirm() {
		confirmModal = {
			...confirmModal,
			open: false
		};
	}

	function openEditCandidateModal(candidate: Candidate) {
		editCandidateModal = {
			open: true,
			candidate,
			onConfirm: editCandidateModal.onConfirm
		};
	}

	function closeEditCandidateModal() {
		editCandidateModal = {
			...editCandidateModal,
			open: false
		};
	}

	export function openEditStateModal(state: State) {
		editStateModal = {
			open: true,
			state: state,
			onConfirm: (newValues) => {
				editRegion(state.shortName, newValues);
				closeEditStateModal();
			}
		};
	}

	function closeEditStateModal() {
		editStateModal = {
			...editStateModal,
			open: false
		};
	}

	function editCandidate(candidateId: number, name: string, colors: string[]) {
		const newCandidates = [...candidates];
		const newCandidate = newCandidates.find((candidate) => {
			return candidate.id === candidateId;
		});
		if (newCandidate) {
			newCandidate.name = name;
			/*
			newCandidate.margins = newCandidate.margins.map((margin, index) => {
				margin.color = colors[index];
				return margin;
			});
			*/
			console.log(newCandidate.margins);
			newCandidate.margins = colors.map((color, index) => {
				return { color, count: newCandidate.margins[index]?.count ?? 0 };
			});
			console.log(newCandidate.margins);
			candidates = newCandidates;
		}
		closeEditCandidateModal();
		_refreshRegions(mapBind, candidates);
	}

	function getMode() {
		return mode;
	}

	function getFillKeyPressed() {
		return fillKeyPressed;
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

	function fillRegion(region: HTMLElement, increment: boolean) {
		candidates = _fillRegion(mapBind, region, selectedCandidateId, candidates, increment);
	}

	function editRegion(shortName: string, newValues: { newValue: number }) {
		const region = mapBind.querySelector(`[short-name="${shortName}"]`);
		if (region) {
			candidates = _editRegion(mapBind, region as HTMLElement, candidates, newValues.newValue);
		}
	}

	function setupMap(node: HTMLDivElement) {
		panZoom = applyPanZoom(node);
		candidates = initializeMap(node, candidates);
		setupRegions(node, fillRegion, getMode, getFillKeyPressed, openEditStateModal);
		setupButtons(node, fillRegion, getMode, getFillKeyPressed);
	}
</script>

<!--Tell Svelte to use the handleKeyDown function when any key pressed and handleKeyUp when key released-->
<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<div class="flex flex-col h-full">
	<NavBar
		onHome={openGoHomeModal}
		onClear={openClearMapModal}
		onMaps={openMapModal}
		onChartPosition={toggleChartPosition}
		onToggleSideBar={toggleSideBar}
		onSetMode={(newMode) => {
			mode = newMode;
		}}
		{mode}
	/>

	<div class="flex flex-row h-full">
		<div
			class="flex flex-grow basis-9/12"
			class:flex-row={chartbar.position === 'left'}
			class:flex-col-reverse={chartbar.position === 'bottom'}
		>
			<div class="flex basis-3/12 justify-center items-center">
				{#if chartbar.position === 'bottom'}
					<div class="divider divider-vertical" />
				{/if}
				<ChartBar {candidates} />
				{#if chartbar.position === 'left'}
					<div class="divider divider-horizontal" />
				{/if}
			</div>
			<div class="basis-9/12 overflow-hidden">
				<div class="flex flex-row flex-wrap justify-center relative pointer-events-none h-0 z-10">
					{#each candidates as candidate}
						<CandidateBox
							{candidate}
							onSelect={setSelectedCandidate}
							onEdit={openEditCandidateModal}
							selected={selectedCandidateId === candidate.id}
						/>
					{/each}
				</div>
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

<ConfirmModal
	open={confirmModal.open}
	title={confirmModal.title}
	message={confirmModal.message}
	onConfirm={confirmModal.onConfirm}
	onClose={closeConfirm}
/>

<EditCandidateModal
	open={editCandidateModal.open}
	candidate={editCandidateModal.candidate}
	onConfirm={editCandidateModal.onConfirm}
	onClose={closeEditCandidateModal}
/>

<EditStateModal
	open={editStateModal.open}
	state={editStateModal.state}
	onConfirm={editStateModal.onConfirm}
	onClose={closeEditStateModal}
/>

<MapModal open={mapModal.open} onClose={closeMapModal} />
