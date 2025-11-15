<script lang="ts">
	import { calculateLumaHEX } from '$lib/utils/luma';

	const {
		count,
		percentage,
		color,
		transitions = true
	}: {
		count: number;
		percentage: number;
		color: string;
		transitions?: boolean;
	} = $props();

	const fontColor = $derived(calculateLumaHEX(color) > 0.5 ? '#000000' : '#ffffff');
</script>

<div
	class="
	  flex flex-col flex-grow
	  overflow-hidden text-xl
	  justify-center items-center"
	class:transition-all={transitions}
	class:ease-linear={transitions}
	class:duration-200={transitions}
	style="flex-basis: {percentage * 100}%; background-color: {color}; color: {fontColor}"
>
	<span>
		{count}
	</span>
</div>
