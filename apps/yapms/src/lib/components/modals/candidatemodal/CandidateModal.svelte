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
	import Cog6Tooth from '$lib/icons/Cog6Tooth.svelte';

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
				<button
					class="btn btn-ghost"
					style:background-color={$TossupCandidateStore.margins[0].color}
					style:color={calculateLumaHEX($TossupCandidateStore.margins[0].color) > 0.5
						? 'black'
						: 'white'}
					on:click={openEditTossupCandidateModal}
				>
					<span>{$TossupCandidateStore.name}</span>
					<Cog6Tooth class="w-5 h-5" />
				</button>
				{#each $CandidatesStore as candidate}
					<button
						class="btn btn-ghost"
						style:background-color={candidate.margins[0].color}
						style:color={calculateLumaHEX(candidate.margins[0].color) > 0.5 ? 'black' : 'white'}
						on:click={() => openEditCandidateModal(candidate)}
					>
						<span>
							{candidate.name}
						</span>
						<Cog6Tooth class="w-5 h-5" />
					</button>
				{/each}
			</div>
		</div>
	</div>
	<div slot="action">
		<button class="btn btn-success" on:click={openAddCandidateModal}>Add</button>
	</div>
</ModalBase>
