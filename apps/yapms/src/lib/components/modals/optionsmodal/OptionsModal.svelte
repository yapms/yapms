<script lang="ts">
	import { ChartPositionStore, ChartTypeStore } from '$lib/stores/Chart';
	import { OptionsModalStore } from '$lib/stores/Modals';
	import ModalBase from '../ModalBase.svelte';
	import { LockMapStore } from '$lib/stores/LockMap';
	import { MapInsetsStore } from '$lib/stores/MapInsetsStore';
	import { ChartLeansStore } from '$lib/stores/ChartLeansStore';
	import { LogoStore } from '$lib/stores/Logo';
	import RedEaglePolitics from '$lib/assets/logos/rep.png';
	import LetsTalkElections from '$lib/assets/logos/lte.png';
	import { RegionTooltipStore } from '$lib/stores/RegionTooltip';
	import { AutoStrokeScaleStore } from '$lib/stores/AutoStrokeScaleStore';
	import { updateAutoStroke } from '$lib/utils/applyPanZoom';

	const chartTypeValues = ['pie', 'battle', 'none'];
	const chartPositionValues = ['bottom', 'left'];
	const logos = [
		{ name: 'Lets Talk Elections', src: LetsTalkElections },
		{ name: 'Red Eagle Politics', src: RedEaglePolitics },
		{ name: 'None', src: null }
	];
</script>

<ModalBase title="Options" store={OptionsModalStore}>
	<div slot="content">
		<div class="flex flex-col">
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
						<select
							class="select select-bordered w-full capitalize"
							bind:value={$ChartPositionStore}
						>
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
					<select class="select select-bordered w-full" bind:value={$LogoStore}>
						{#each logos as logo}
							<option value={logo.src}>{logo.name}</option>
						{/each}
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
			</div>
			<label class="label flex-col cursor-pointer items-start justify-start space-y-2">
				<div class="flex w-full justify-between">
					<span class="label-text">Border Width</span>
					<span class="label-text">{($AutoStrokeScaleStore * 100).toFixed(0)}%</span>
				</div>
				<input
					type="range"
					min="0"
					max="5"
					step="0.1"
					bind:value={$AutoStrokeScaleStore}
					on:change={updateAutoStroke}
					class="range"
				/>
			</label>
		</div>
	</div>
</ModalBase>
