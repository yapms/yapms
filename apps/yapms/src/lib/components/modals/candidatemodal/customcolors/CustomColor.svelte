<script lang="ts">
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import { calculateLumaHEX } from '$lib/utils/luma';

	export let color: string;
	export let onChange: (color: string) => void;
	export let onDelete: () => void;

	let colorInput: HTMLInputElement | undefined;

	$: textColor = calculateLumaHEX(color) > 0.5 ? 'black' : 'white';

	function editColor() {
		colorInput?.click();
	}

	function changeColor(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		onChange(event.currentTarget.value);
	}

	function removeColor() {
		onDelete();
	}
</script>

<div class="join items-center">
	<button class="btn join-item btn-sm" on:click={editColor} style:background-color={color}>
		<span style:color={textColor}>{color}</span>
		<input
			bind:this={colorInput}
			bind:value={color}
			type="color"
			class="hidden"
			on:change={changeColor}
		/>
	</button>
	<button class="btn btn-sm btn-error join-item" on:click={removeColor}
		><MinusCircle class="w-6 h-6" /></button
	>
</div>
