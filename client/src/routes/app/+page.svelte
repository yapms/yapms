<script lang="ts">
	import { goto } from '$app/navigation';
	import ConfirmModal from '$lib/components/modals/common/ConfirmModal.svelte';
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import SideBar from '$lib/components/sidebar/SideBar.svelte';
	import CandidateBox from '$lib/components/candidatebox/CandidateBox.svelte';
	import { zoom } from 'd3-zoom';
	import { select } from 'd3-selection';
	import type Candidate from '$lib/types/Candidate';
	import EditCandidateModal from '$lib/components/modals/editcandidatemodal/EditCandidateModal.svelte';
	import ChartBar from '$lib/components/chartbar/ChartBar.svelte';

	const imports = {
		usa: () => import('$lib/assets/usa.svg?raw'),
		nz: () => import('$lib/assets/nz.svg?raw')
	};

	let currentMap = 'usa' as keyof typeof imports;
	let mapBind: HTMLDivElement;

	let selectedCandidateId = 0;

	let candidates: Candidate[] = [
		{ id: 0, name: 'Joe Biden', margins: [{ color: 'blue', count: 0 }] },
		{ id: 1, name: 'Donald Trump', margins: [{ color: 'red', count: 0 }] }
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
		onConfirm: () => {}
	};

	let editCandidateModal = {
		open: false,
		candidate: {} as Candidate,
		onConfirm: () => {}
	};

	function toggleMap() {
		currentMap = currentMap === 'usa' ? 'nz' : 'usa';
	}

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
				closeConfirm();
			}
		};
	}

	function openMapSelectionModal() {
		confirmModal = {
			open: true,
			title: 'Confirm Maps',
			message: 'Are you sure you want to go to the maps page?',
			onConfirm: () => {
				closeConfirm();
			}
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
			onConfirm: () => {
				closeEditCandidateModal();
			}
		};
	}

	function closeEditCandidateModal() {
		editCandidateModal = {
			...editCandidateModal,
			open: false
		};
	}

	$: (() => {
		currentMap;
		selectedCandidateId;
		const states = mapBind?.querySelector('.state');
		states?.childNodes.forEach((node) => {
			const domNode = node as HTMLElement;
			domNode.onclick = () => {
				const newCandidates = candidates;
				const selectedCandidateColor = newCandidates.find(
					(candidate) => candidate.id === selectedCandidateId
				)?.margins[0].color;
				domNode.setAttribute('fill', selectedCandidateColor || 'green');
				const currentCandidate = domNode.getAttribute('candidate');
				if (currentCandidate) {
					const candidate = newCandidates.find((c) => c.id === parseInt(currentCandidate, 10));
					if (candidate) {
						candidate.margins[0].count--;
					}
				}
				domNode.setAttribute('candidate', selectedCandidateId.toString());
				const candidate = newCandidates.find((c) => c.id === selectedCandidateId);
				if (candidate) {
					candidate.margins[0].count++;
				}

				candidates = newCandidates;
				console.log(candidates);
			};
		});
	})();

	$: (() => {
		const selection = select(mapBind);

		const myZoom = zoom().on('zoom', ({ transform }) => {
			const { k, x, y } = transform;
			const states = selection.select('.state');
			const text = selection.select('#text');
			states.attr('transform', `translate(${x}, ${y}) scale(${k})`);
			text.attr('transform', `translate(${x}, ${y}) scale(${k})`);
		});

		// @ts-ignore
		selection.call(myZoom).on('dblclick.zoom', null);
	})();

	$: if (mapBind) {
		const states = mapBind.querySelector('.state');
		states?.childNodes.forEach((child) => {
			const childHTML = child as HTMLElement;
			console.log(childHTML);
			if(childHTML.setAttribute) {
				childHTML.setAttribute('fill', 'grey');
				childHTML.setAttribute('stroke', 'black');
			}
		});
	}

</script>

<div class="flex flex-col h-full">
	<NavBar
		onHome={openGoHomeModal}
		onClear={openClearMapModal}
		onMaps={openMapSelectionModal}
		onChartPosition={toggleChartPosition}
		onToggleSideBar={toggleSideBar}
	/>

	<div class="flex flex-row h-full">
		<div
			class="flex flex-grow basis-9/12"
			class:flex-row={chartbar.position === 'left'}
			class:flex-col-reverse={chartbar.position === 'bottom'}
		>
			<div
				class="flex basis-3/12 justify-center items-center"
				class:border-r-2={chartbar.position === 'left'}
				class:border-t-2={chartbar.position === 'bottom'}
			>
				<ChartBar {candidates} />
			</div>
			<div class="basis-9/12 overflow-hidden">
				<div class="flex flex-row flex-wrap justify-center relative pointer-events-none h-0">
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
					<div bind:this={mapBind} class="overflow-hidden h-full">
						{@html module.default}
					</div>
				{/await}
			</div>
		</div>

		<SideBar open={sidebar.open} />
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
