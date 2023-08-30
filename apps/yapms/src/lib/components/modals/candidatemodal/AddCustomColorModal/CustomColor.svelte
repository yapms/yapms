<script lang="ts">
	import MinusCircle from '$lib/icons/MinusCircle.svelte';
	import { AddCustomColorModalStore } from '$lib/stores/Modals';
	import { calculateLumaHEX } from '$lib/utils/luma';

	export let color: string = '#000000';
	export let index: number = 0;

	let colorInput: HTMLInputElement | undefined;

	$: textColor = calculateLumaHEX(color) > 0.5 ? 'black' : 'white';

	function editColor() {
		colorInput?.click();
	}

	function changeColor(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		$AddCustomColorModalStore.newColors[index] = event.currentTarget.value;
	}

	function removeColor(index: number) {
		$AddCustomColorModalStore.newColors = $AddCustomColorModalStore.newColors.toSpliced(index, 1);
		if ($AddCustomColorModalStore.newColors.length === 0) {
			$AddCustomColorModalStore.newColors = ['#000000'];
		}
	}
</script>

<div class="join items-center">
	<button class="btn join-item btn-sm" on:click={editColor} style:background-color={color}>
		<span style:color={textColor}>{color}</span>
		<input bind:this={colorInput} type="color" class="hidden" on:change={changeColor} />
	</button>
	<button class="btn btn-sm btn-error join-item" on:click={() => removeColor(index)}
		><MinusCircle class="w-6 h-6" /></button
	>
</div>
