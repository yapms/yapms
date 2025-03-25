<script lang="ts">
	import { ChartPositionStore, ChartTypeStore } from '$lib/stores/Chart';
	import { OptionsModalStore } from '$lib/stores/Modals';
	import ModalBase from '../ModalBase.svelte';
	import { LockMapStore } from '$lib/stores/LockMap';
	import { MapInsetsStore } from '$lib/stores/MapInsetsStore';
	import { ChartLeansStore } from '$lib/stores/ChartLeansStore';
	import { LogoStore } from '$lib/stores/Logo';
	import { RegionTooltipStore } from '$lib/stores/RegionTooltip';
	import { AutoStrokeMultiplierStore } from '$lib/stores/AutoStrokeMultiplierStore';
	import { CandidateBoxOptions } from '$lib/stores/CandidateBoxOptions';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { FontColorStore } from '$lib/stores/FontColorStore';
	import { PUBLIC_POCKETBASE_URI } from '$env/static/public';
	import { RegionTextsStore } from '$lib/stores/RegionTextsStore';
	import { RegionStrokeColorStore } from '$lib/stores/RegionStrokeColorStore';

	let logoFile: FileList | undefined;
	let logoFileInput: HTMLInputElement | undefined;

	let logos = $PocketBaseStore.collection('creator_logos').getFullList();

	const chartTypeValues = ['pie', 'doughnut', 'battle', 'none'];
	const chartPositionValues = ['bottom', 'left'];

	function readLogoFile() {
		if (logoFile === undefined || logoFile.length < 1) {
			return;
		}
		const fileReader = new FileReader();
		const file = logoFile[0];
		new FileReader().readAsDataURL(file);
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			$LogoStore = fileReader.result?.toString() || null;
		};
		fileReader.onerror = () => {
			console.error(fileReader.error);
		};
	}

	function clearLogoFile() {
		if (logoFileInput) logoFileInput.value = '';
	}
</script>

<ModalBase title="Options" store={OptionsModalStore}>
	<div slot="content" class="grid grid-cols-1 lg:grid-cols-2 gap-2">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Chart Options</legend>
			<select class="select capitalize w-full" bind:value={$ChartTypeStore}>
				{#each chartTypeValues as type}
					<option>{type}</option>
				{/each}
			</select>
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend">Chart Position</legend>
			<select class="select capitalize w-full" bind:value={$ChartPositionStore}>
				{#each chartPositionValues as position}
					<option>{position}</option>
				{/each}
			</select>
		</fieldset>

		<fieldset class="fieldset lg:col-span-2">
			<legend class="fieldset-legend">Chart Logo</legend>
			<select class="select w-full" bind:value={$LogoStore} on:change={clearLogoFile}>
				<option selected disabled>Choose one...</option>
				<option value={null}>None</option>
				{#await logos then logos}
					{#each logos as logo}
						<option
							value={`${PUBLIC_POCKETBASE_URI}/api/files/${logo.collectionId}/${logo.id}/${logo.image}`}
						>
							{logo.label}
						</option>
					{/each}
				{/await}
			</select>
			<input
				type="file"
				class="file-input file-input-bordered w-full"
				accept="image/*"
				bind:files={logoFile}
				bind:this={logoFileInput}
				on:change={readLogoFile}
			/>
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend">Font Color</legend>
			<select class="select w-full capitalize" bind:value={$FontColorStore}>
				<option value="auto">Auto</option>
				<option value="white">White</option>
				<option value="black">Black</option>
			</select>
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend">Border Color</legend>
			<select class="select w-full capitalize" bind:value={$RegionStrokeColorStore}>
				<option value="background">Background</option>
				<option value="contrast">Contrasting</option>
				<option value="white">White</option>
				<option value="black">Black</option>
			</select>
		</fieldset>

		<div class="grid grid-cols-2 col-span-2">
			<fieldset class="fieldset">
				<label class="fieldset-label">
					<input type="checkbox" class="toggle" bind:checked={$LockMapStore} />
					Lock Map
				</label>
			</fieldset>

			<fieldset class="fieldset">
				<label class="fieldset-label">
					<input type="checkbox" class="toggle" bind:checked={$MapInsetsStore.hidden} />
					Hide Insets Lock Map
				</label>
			</fieldset>

			<fieldset class="fieldset">
				<label class="fieldset-label">
					<input type="checkbox" class="toggle" bind:checked={$ChartLeansStore.enabled} />
					Chart Tils
				</label>
			</fieldset>

			<fieldset class="fieldset">
				<label class="fieldset-label">
					<input type="checkbox" class="toggle" bind:checked={$RegionTooltipStore.enabled} />
					Region Tooltips
				</label>
			</fieldset>

			<fieldset class="fieldset">
				<label class="fieldset-label">
					<input type="checkbox" class="toggle" bind:checked={$RegionTextsStore.hidden} />
					Hide Labels
				</label>
			</fieldset>
		</div>

		<fieldset class="fieldset lg:col-span-2">
			<legend class="fieldset-legend"> Candidate Font Size </legend>
			<input
				type="range"
				min="0"
				max="4"
				class="range w-full"
				bind:value={$CandidateBoxOptions.fontSize}
			/>
			<div class="w-full flex justify-between text-xs px-2">
				<span>X-Small</span>
				<span>Small</span>
				<span>Medium</span>
				<span>Large</span>
				<span>X-Large</span>
			</div>
		</fieldset>

		<fieldset class="fieldset lg:col-span-2">
			<legend class="fieldset-legend">Border Width</legend>
			<input
				type="range"
				min="0"
				max="5"
				step="0.1"
				bind:value={$AutoStrokeMultiplierStore}
				class="range w-full"
			/>
			<div class="flex w-full justify-between">
				<span class="label-text">Border Width</span>
				<span class="label-text">{($AutoStrokeMultiplierStore * 100).toFixed(0)}%</span>
			</div>
		</fieldset>
	</div>
</ModalBase>
