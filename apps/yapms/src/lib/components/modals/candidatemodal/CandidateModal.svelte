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
	import type { Candidate } from '$lib/types/Candidate';
	import Bars3 from '$lib/icons/Bars3.svelte';
	import QuestionMarkCircle from '$lib/icons/QuestionMarkCircle.svelte';
	import { SortableItem } from 'svelte-sortable-items';
	import { flip } from 'svelte/animate';

	function openEditTossupCandidateModal() {
		$CandidateModalStore.open = false;
		$EditTossupModalStore.open = true;
	}

	function openEditCandidateModal(candidate: Candidate) {
		$CandidateModalStore.open = false;
		$EditCandidateModalStore = {
			candidateId: candidate.id,
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
		<div class="flex gap-2 mt-4 flex-wrap justify-center">
			<ul class="flex flex-wrap justify-center gap-3">
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
				{#each $CandidatesStore as candidate, index (candidate.id)}
					<div animate:flip={{ duration: 100 }}>
						<SortableItem propItemNumber={index} bind:propData={$CandidatesStore}>
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
						</SortableItem>
					</div>
				{/each}
			</ul>
		</div>
	</div>
	<div slot="action" class="flex justify-between w-full">
		<div class="flex gap-1 self-center items-center font-thin">
			<QuestionMarkCircle class="w-5 h-5" style="stroke-width: 0.75px" />
			<span>Click and drag to reorder</span>
		</div>
		<button class="btn btn-success" on:click={openAddCandidateModal}>Add</button>
	</div>
</ModalBase>
