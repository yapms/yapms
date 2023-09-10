<script lang="ts">
	import { RegionTooltipStore } from '$lib/stores/RegionTooltip';
	import { computePosition, offset, flip, shift } from '@floating-ui/dom';

	let tooltip: HTMLDivElement | undefined = undefined;
	let top = 0;
	let left = 0;

	RegionTooltipStore.subscribe(() => {
		const virtualEl = {
			getBoundingClientRect() {
				return {
					width: 0,
					height: 0,
					x: $RegionTooltipStore.x,
					y: $RegionTooltipStore.y,
					left: $RegionTooltipStore.x,
					right: $RegionTooltipStore.x,
					top: $RegionTooltipStore.y,
					bottom: $RegionTooltipStore.y
				};
			}
		};

		if (tooltip !== undefined) {
			computePosition(virtualEl, tooltip, {
				placement: 'right-start',
				middleware: [offset(15), flip(), shift()]
			}).then(({ x, y }) => {
				top = y;
				left = x;
			});
		}
	});
</script>

{#if $RegionTooltipStore.enabled}
	<div
		bind:this={tooltip}
		class="bg-base-200 rounded-md absolute px-2 py-1 select-none drop-shadow-md"
		class:hidden={!$RegionTooltipStore.delayElapsed || !$RegionTooltipStore.inRegions}
		style="top:{top}px; left:{left}px;"
	>
		<p class="text-sm">{$RegionTooltipStore.content}</p>
	</div>
{/if}
