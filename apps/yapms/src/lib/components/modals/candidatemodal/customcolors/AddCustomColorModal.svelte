<script lang="ts">
	import PlusCircle from '$lib/icons/PlusCircle.svelte';
	import { CustomColorsStore } from '$lib/stores/CustomColors';
	import { AddCustomColorModalStore, PresetColorsModalStore } from '$lib/stores/Modals';
	import ModalBase from '../../ModalBase.svelte';
	import CustomColor from './CustomColor.svelte';

	function close() {
		$AddCustomColorModalStore.open = false;
		$PresetColorsModalStore.open = true;
		$AddCustomColorModalStore.newColors = ['#000000'];
	}

	function deleteColor(index: number) {
		$AddCustomColorModalStore.newColors.splice(index, 1);
		$AddCustomColorModalStore.newColors = $AddCustomColorModalStore.newColors;
	}

	function changeColor(index: number, color: string) {
		$AddCustomColorModalStore.newColors[index] = color;
	}

	function addColor() {
		$AddCustomColorModalStore.newColors = [...$AddCustomColorModalStore.newColors, '#000000'];
	}

	function add() {
		$CustomColorsStore = [...$CustomColorsStore, $AddCustomColorModalStore.newColors];
		close();
	}
</script>

<ModalBase title="Add Custom Color" store={AddCustomColorModalStore} onClose={close}>
	<div slot="content">
		<div class="flex flex-row flex-wrap gap-3 justify-center">
			{#each $AddCustomColorModalStore.newColors as color, index}
				<CustomColor
					{color}
					onChange={(color) => changeColor(index, color)}
					onDelete={() => deleteColor(index)}
				/>
			{/each}
			<button class="btn btn-sm btn-success" onclick={addColor}
				><PlusCircle class="w-6 h-6" /></button
			>
		</div>
	</div>
	<div slot="action">
		<button
			class="btn btn-success"
			onclick={add}
			disabled={$AddCustomColorModalStore.newColors.length < 1}>Add Colors</button
		>
	</div>
</ModalBase>
