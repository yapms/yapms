<script lang="ts">
	import LogoGrid from '$lib/components/modalutilities/LogoGrid.svelte';
	import { MapInsetsStore } from '$lib/stores/MapInsetsStore';
	import { StyleModalStore } from '$lib/stores/Modals';
	import ThemeGrid from '../../modalutilities/ThemeGrid.svelte';
	import ModalBase from '../ModalBase.svelte';

	function toggleInsets() {
		$MapInsetsStore.hidden = !$MapInsetsStore.hidden;
	}
</script>

<ModalBase title="Change Style" store={StyleModalStore}>
	<div slot="content">
		<div class="flex flex-row lg:flex-col gap-3">
			<div class="flex flex-col">
				<h3 class="font-light text-lg pb-3">Themes</h3>
				<ThemeGrid />
			</div>
			<div class="flex flex-col">
				<h3 class="font-light text-lg pb-3">Logos</h3>
				<LogoGrid />
			</div>
			<h3 class="font-light text-lg">Other</h3>
			<div class="form-control">
				<label class="label cursor-pointer justify-start space-x-2">
					<span class="label-text">Hide Insets</span>
					<input
						type="checkbox"
						on:change={toggleInsets}
						checked={$MapInsetsStore.hidden}
						class="checkbox"
					/>
				</label>
			</div>
		</div>
	</div>
</ModalBase>
