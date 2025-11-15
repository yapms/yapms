<script lang="ts">
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import { calculateLumaHEX } from '$lib/utils/luma';

	let {
		color,
		onChange,
		onDelete
	}: {
		color: string;
		onChange: (color: string) => void;
		onDelete: () => void;
	} = $props();

	let colorInput: HTMLInputElement | undefined;

	const textColor = $derived(calculateLumaHEX(color) > 0.5 ? 'black' : 'white');

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
	<button class="btn join-item btn-sm gap-0" onclick={editColor} style:background-color={color}>
		<input
			bind:this={colorInput}
			bind:value={color}
			type="color"
			class="w-0"
			onchange={changeColor}
		/>
		<span style:color={textColor}>{color}</span>
	</button>
	<button class="btn btn-sm btn-error join-item" onclick={removeColor}
		><MinusCircle class="w-6 h-6" /></button
	>
</div>
