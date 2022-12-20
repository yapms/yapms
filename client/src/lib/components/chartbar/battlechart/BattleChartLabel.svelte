<script lang="ts">
	import { calculateLumaHEX } from '$lib/utils/luma';

	export let displayName: boolean;

	export let name: string;
	export let count: number;
	export let percentage: number;
	export let color: string;

	$: fontColor = calculateLumaHEX(color) > 0.5 ? '#000000' : '#ffffff';
</script>

<div
	class="
  flex flex-col flex-grow
  overflow-hidden text-xl
  justify-center items-center
  transition-all ease-linear duration-200"
	style="flex-basis: {percentage * 100}%; background-color: {color}; color: {fontColor}"
>
	{#if displayName}
		<span class="whitespace-nowrap">
			{name}
		</span>
	{/if}
	<span>
		{count}
	</span>
</div>
