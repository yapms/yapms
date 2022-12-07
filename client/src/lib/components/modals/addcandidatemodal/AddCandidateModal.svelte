<script type="ts">
	import { CandidatesStore } from '$lib/stores/Candidates';
	import { AddCandidateModalStore } from '$lib/stores/Modals';

	let newName = '';
	let newColors: string[] = ['#000000'];

	function initialize() {
		newName = '';
		newColors = ['#000000'];
	}

	function addColor() {
		newColors = [...newColors, '#000000'];
	}

	function removeColor() {
		if (newColors.length > 1) {
			newColors = newColors.slice(0, newColors.length - 1);
		}
	}

	function close() {
		AddCandidateModalStore.set({
			open: false
		});
		initialize();
	}

	function confirm() {
		CandidatesStore.update((candidates) => [
			...candidates,
			{
				id: crypto.randomUUID(),
				name: newName,
				margins: newColors.map((color) => { return { color } })
			}
		]);
		AddCandidateModalStore.set({
			open: false
		});
		initialize();
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$AddCandidateModalStore.open} />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Add Candidate</h3>

		<div class="flex">
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
			<button class="btn btn-primary" on:click={close}> Close </button>
			<button class="btn btn-primary" on:click={confirm}> Confirm </button>
		</div>
	</div>
</div>