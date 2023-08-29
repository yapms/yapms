<script lang="ts">
	import { CustomColorsStore } from '$lib/stores/CustomColors';
	import { AddCustomColorModalStore, PresetColorsModalStore } from '$lib/stores/Modals';
	import ModalBase from '../ModalBase.svelte';

	function close() {
		$AddCustomColorModalStore.open = false;
		$PresetColorsModalStore.open = true;
		$AddCustomColorModalStore.newColors = ['#000000'];
	}

	function addColor() {
		$AddCustomColorModalStore.newColors = [...$AddCustomColorModalStore.newColors, '#000000'];
	}

	function removeColor() {
		$AddCustomColorModalStore.newColors = $AddCustomColorModalStore.newColors.slice(
			0,
			$AddCustomColorModalStore.newColors.length - 1
		);
		if ($AddCustomColorModalStore.newColors.length === 0) {
			$AddCustomColorModalStore.newColors = ['#000000'];
		}
	}

	function add() {
		$CustomColorsStore = [...$CustomColorsStore, $AddCustomColorModalStore.newColors];
		close();
	}
</script>

<ModalBase title="Add Custom Color" store={AddCustomColorModalStore} onClose={close}>
	<div slot="content">
		<div class="flex flex-row flex-wrap gap-2">
			{#each $AddCustomColorModalStore.newColors as color, index}
				<input
					type="color"
					value={color}
					on:change={(change) => {
						$AddCustomColorModalStore.newColors[index] = change.currentTarget.value;
					}}
				/>
			{/each}
		</div>
	</div>
	<div slot="action">
		<button class="btn btn-error" on:click={removeColor}>remove color</button>
		<button class="btn btn-success" on:click={addColor}>add color</button>
		<button class="btn btn-success" on:click={add}>confirm</button>
	</div>
</ModalBase>
