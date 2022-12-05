<script lang="ts">
	import CandidateBox from '$lib/components/candidatebox/CandidateBox.svelte';
	import { CandidatesStore } from '$lib/stores/Candidates';
	import { EditCandidateModalStore } from '$lib/stores/Modals';

	$: name = $EditCandidateModalStore.candidate.name;
	$: newName = name;
	$: newColors = $EditCandidateModalStore.candidate.margins.map((margin) => {
		return margin.color;
	});

	function addColor() {
		newColors = [...newColors, '#000000'];
	}

	function removeColor() {
		if (newColors.length === 1) {
			return;
		}
		newColors = newColors.slice(0, newColors.length - 1);
	}

	function cancel() {
		EditCandidateModalStore.set({
			...$EditCandidateModalStore,
			open: false
		});
	}

	function confirm() {
		EditCandidateModalStore.set({
			...$EditCandidateModalStore,
			open: false
		});
		const newCandidates = $CandidatesStore;
		const candidateIndex = newCandidates.findIndex(
			(candidate) => candidate.id === $EditCandidateModalStore.candidate.id
		);
		newCandidates[candidateIndex] = {
			...$EditCandidateModalStore.candidate,
			name: newName,
			margins: newColors.map((color) => {
				return {
					color
				};
			})
		};
		CandidatesStore.set(newCandidates);
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$EditCandidateModalStore.open} />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">{name}</h3>
		<div class="flex gap-3">
			<div class="form-control w-full max-w-xs">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Name</span>
				</label>
				<input type="text" class="input input-bordered w-full max-w-xs" bind:value={newName} />
			</div>
			<div class="divider divider-horizontal" />
			<div class="form-control w-full max-w-xs flex flex-col gap-3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Colors</span>
				</label>
				<div class="flex flex-row flex-wrap gap-2">
					{#each newColors as color, index}
						<input
							type="color"
							value={color}
							on:change={(change) => {
								newColors[index] = change.currentTarget.value;
							}}
						/>
					{/each}
				</div>
				<div class="btn-group btn-group-horizontal">
					<input
						type="button"
						class="btn btn-error btn-sm grow"
						on:click={removeColor}
						value="Remove"
					/>
					<input
						type="button"
						class="btn btn-primary btn-sm grow"
						on:click={addColor}
						value="Add"
					/>
				</div>
			</div>
		</div>
		<div class="modal-action">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label for="my-modal" class="btn btn-primary" on:click={cancel}>Cancel</label>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label for="my-modal" class="btn btn-primary" on:click={confirm}>Confirm</label>
		</div>
	</div>
</div>
