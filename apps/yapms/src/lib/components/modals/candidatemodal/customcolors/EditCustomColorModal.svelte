<script lang="ts">
	import PlusCircle from '$lib/icons/PlusCircle.svelte';
	import { CustomColorsStore } from '$lib/stores/CustomColors';
	import { EditCustomColorModalStore, PresetColorsModalStore } from '$lib/stores/Modals';
	import ModalBase from '../../ModalBase.svelte';
	import CustomColor from './CustomColor.svelte';

	function close() {
		$EditCustomColorModalStore.open = false;
		$PresetColorsModalStore.open = true;
	}

	function deleteColor(index: number) {
		$EditCustomColorModalStore.customColor.splice(index, 1);
		$EditCustomColorModalStore.customColor = $EditCustomColorModalStore.customColor;
	}

	function changeColor(index: number, color: string) {
		$EditCustomColorModalStore.customColor[index] = color;
	}

	function addColor() {
		$EditCustomColorModalStore.customColor = [...$EditCustomColorModalStore.customColor, '#000000'];
	}

	function confirm() {
		$CustomColorsStore[$EditCustomColorModalStore.customColorIndex] =
			$EditCustomColorModalStore.customColor;
		close();
	}
</script>

<ModalBase title="Edit Custom Color" store={EditCustomColorModalStore} onClose={close}>
	<div slot="content">
		<div class="flex flex-wrap gap-3 justify-center">
			{#each $EditCustomColorModalStore.customColor as color, index}
				<CustomColor
					{color}
					onChange={(color) => changeColor(index, color)}
					onDelete={() => deleteColor(index)}
				/>
			{/each}
			<button class="btn btn-sm btn-success" on:click={addColor}
				><PlusCircle class="w-6 h-6" /></button
			>
		</div>
	</div>
	<div slot="action">
		<button
			class="btn btn-success"
			on:click={confirm}
			disabled={$EditCustomColorModalStore.customColor.length < 1}>Confirm</button
		>
	</div>
</ModalBase>
