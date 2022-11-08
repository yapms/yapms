<script lang="ts">
	import type Candidate from '$lib/types/Candidate';

	export let open = false;
	export let candidate: Candidate;
	export let onConfirm: (candidateId: number, name: string, colors: string[]) => void;
	export let onClose: () => void;

	let name: string;
	let colors: string[];

	$: colors = candidate.margins.map((margin) => {
		return margin.color;
	});

	$: name = candidate.name;

	function addColor() {
		colors = [...colors, '#000000'];
	}

	function removeColor() {
		colors = colors.slice(0, colors.length - 1);
	}
</script>

<input type="checkbox" class="modal-toggle" checked={open} />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">{candidate.name}</h3>
		<div class="flex gap-3">
			<div class="form-control w-full max-w-xs">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Name</span>
				</label>
				<input
					value={candidate.name}
					type="text"
					class="input input-bordered w-full max-w-xs"
					on:change={(newName) => {
						name = newName.target?.value;
					}}
				/>
			</div>
			<div class="divider divider-horizontal"></div>
			<div class="form-control w-full max-w-xs flex flex-col gap-3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Colors</span>
				</label>
				<div class="flex flex-row flex-wrap gap-2">
					{#each colors as color, index}
						<input
							type="color"
							value={color}
							on:change={(newColor) => {
								colors[index] = newColor.target?.value;
							}}
						/>
					{/each}
				</div>
				<div class="btn-group btn-group-horizontal">
					<input type="button" class="btn btn-error btn-sm grow" on:click={removeColor} value="Remove" />
					<input type="button" class="btn btn-primary btn-sm grow" on:click={addColor} value="Add" />
				</div>
			</div>
		</div>
		<div class="modal-action">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label for="my-modal" class="btn btn-primary" on:click={onClose}> Close </label>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label
				for="my-modal"
				class="btn btn-primary"
				on:click={() => {
					onConfirm(candidate.id, name, colors);
				}}
			>
				Confirm
			</label>
		</div>
	</div>
</div>
