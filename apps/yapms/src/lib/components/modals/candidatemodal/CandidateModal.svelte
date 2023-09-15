<script lang="ts">
	import { CandidatesStore, TossupCandidateStore } from '$lib/stores/Candidates';
	import {
		CandidateModalStore,
		AddCandidateModalStore,
		EditCandidateModalStore,
		EditTossupModalStore
	} from '$lib/stores/Modals';
	import ModalBase from '../ModalBase.svelte';
	import { calculateLumaHEX } from '$lib/utils/luma';
	import type Candidate from '$lib/types/Candidate';
	import Sortable from 'sortablejs';
	import Bars3 from '$lib/icons/Bars3.svelte';
	import QuestionMarkCircle from '$lib/icons/QuestionMarkCircle.svelte';

	let sortable: Sortable | undefined;
	let list: HTMLUListElement | undefined;

	$: if (list !== undefined) {
		if (sortable !== undefined) {
			sortable.destroy();
		}
		sortable = Sortable.create(list, {
			animation: 140,
			dragoverBubble: true,
			delay: 250,
			delayOnTouchOnly: true,
			onUpdate: (event) => {
				if (event.oldIndex === undefined || event.newIndex === undefined) {
					return;
				}
				event.oldIndex -= 1;
				event.newIndex -= 1;
				let candidates = [...$CandidatesStore];
				let candidate = candidates[event.oldIndex];
				candidates.splice(event.oldIndex, 1);
				candidates.splice(event.newIndex, 0, candidate);
				$CandidatesStore = candidates;
			}
		});
	}

	function openEditTossupCandidateModal() {
		$CandidateModalStore.open = false;
		$EditTossupModalStore.open = true;
	}

	function openEditCandidateModal(candidate: Candidate) {
		$CandidateModalStore.open = false;
		$EditCandidateModalStore = {
			candidate,
			open: true
		};
	}

	function openAddCandidateModal() {
		$CandidateModalStore.open = false;
		$AddCandidateModalStore.open = true;
	}
</script>

<ModalBase title="Candidates" store={CandidateModalStore}>
	<div slot="content">
		<div class="flex">
			<div class="flex gap-2 mt-4 flex-wrap justify-center">
				<ul bind:this={list} class="flex flex-wrap justify-center gap-3">
					<button
						class="btn btn-ghost"
						style:background-color={$TossupCandidateStore.margins[0].color}
						style:color={calculateLumaHEX($TossupCandidateStore.margins[0].color) > 0.5
							? 'black'
							: 'white'}
						on:click={openEditTossupCandidateModal}
					>
						<span>{$TossupCandidateStore.name}</span>
					</button>
					{#each $CandidatesStore as candidate (candidate.id)}
						<li>
							<div
								role="button"
								tabindex="0"
								class="btn btn-ghost"
								style:background-color={candidate.margins[0].color}
								style:color={calculateLumaHEX(candidate.margins[0].color) > 0.5 ? 'black' : 'white'}
								on:click={() => openEditCandidateModal(candidate)}
								on:keydown={() => openEditCandidateModal(candidate)}
							>
								{candidate.name}
								<Bars3 class="w-5 h-5" />
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
	<div slot="action" class="flex justify-between w-full">
		<div class="flex gap-1 self-center items-center">
			<QuestionMarkCircle class="w-5 h-5" />
			<span>click and drag to reorder</span>
		</div>
		<button class="btn btn-success" on:click={openAddCandidateModal}>Add</button>
	</div>
</ModalBase>
