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

	let logoFile: FileList | undefined;
	let logoFileInput: HTMLInputElement | undefined;

	let logos = $PocketBaseStore.collection('creator_logos').getFullList();

	const chartTypeValues = ['pie', 'doughnut', 'battle', 'horizontal Bar', 'none'];
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
	<div slot="content" class="flex flex-col gap-2">
		<div class="lg:flex w-full">
			<div class="form-control w-full">
				<label class="label flex-col cursor-pointer items-start justify-start space-y-2">
					<span class="label-text">Chart Type</span>
					<select class="select select-bordered w-full capitalize" bind:value={$ChartTypeStore}>
						{#each chartTypeValues as type}
							<option>{type}</option>
						{/each}
					</select>
				</label>
			</div>
			<div class="form-control w-full">
				<label class="label flex-col cursor-pointer items-start justify-start space-y-2">
					<span class="label-text">Chart Position</span>
					<select class="select select-bordered w-full capitalize" bind:value={$ChartPositionStore}>
						{#each chartPositionValues as position}
							<option>{position}</option>
						{/each}
					</select>
				</label>
			</div>
		</div>
		<div class="form-control w-full">
			<label class="label flex-col cursor-pointer items-start justify-start space-y-2">
				<span class="label-text">Chart Logo</span>
				<select
					class="select select-bordered w-full"
					bind:value={$LogoStore}
					on:change={clearLogoFile}
				>
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
			</label>
		</div>
		<div class="form-control w-full">
			<label class="label flex-col cursor-pointer items-start justify-start space-y-2">
				<span class="label-text">Font Color</span>
				<select class="select select-bordered w-full capitalize" bind:value={$FontColorStore}>
					<option value="auto">Auto</option>
					<option value="white">White</option>
					<option value="black">Black</option>
				</select>
			</label>
		</div>
		<div class="grid grid-cols-2">
			<div class="form-control w-full">
				<label class="label cursor-pointer justify-start gap-3">
					<input type="checkbox" class="toggle" bind:checked={$LockMapStore} />
					<span class="label-text">Lock Map</span>
				</label>
			</div>
			<div class="form-control w-full">
				<label class="label cursor-pointer justify-start gap-3">
					<input type="checkbox" class="toggle" bind:checked={$MapInsetsStore.hidden} />
					<span class="label-text">Hide Insets</span>
				</label>
			</div>
			<div class="form-control w-full">
				<label class="label cursor-pointer justify-start gap-3">
					<input type="checkbox" class="toggle" bind:checked={$ChartLeansStore.enabled} />
					<span class="label-text">Chart Tilts</span>
				</label>
			</div>
			<div class="form-control w-full">
				<label class="label cursor-pointer justify-start gap-3">
					<input type="checkbox" class="toggle" bind:checked={$RegionTooltipStore.enabled} />
					<span class="label-text">Region Tooltip</span>
				</label>
			</div>
			<div class="form-control w-full">
				<label class="label cursor-pointer justify-start gap-3">
					<input type="checkbox" class="toggle" bind:checked={$RegionTextsStore.hidden} />
					<span class="label-text">Hide Labels</span>
				</label>
			</div>
		</div>
		<label class="label flex-col items-start gap-2">
			<span class="label-text">Candidate Font Size</span>
			<input
				type="range"
				min="0"
				max="4"
				class="range"
				bind:value={$CandidateBoxOptions.fontSize}
			/>
			<div class="w-full flex justify-between text-xs px-2">
				<span>X-Small</span>
				<span>Small</span>
				<span>Medium</span>
				<span>Large</span>
				<span>X-Large</span>
			</div>
		</label>
		<label class="label flex-col items-start gap-2">
			<div class="flex w-full justify-between">
				<span class="label-text">Border Width</span>
				<span class="label-text">{($AutoStrokeMultiplierStore * 100).toFixed(0)}%</span>
			</div>
			<input
				type="range"
				min="0"
				max="5"
				step="0.1"
				bind:value={$AutoStrokeMultiplierStore}
				class="range"
			/>
		</label>
	</div>
</ModalBase>
