<script lang="ts">
  import { ChartPositionStore } from "$lib/stores/Chart";
	import { calculateLumaHEX } from "$lib/utils/luma";

  export let displayName: boolean;

  export let name: string;
  export let count: number;
  export let percentage: number;
  export let color: string;

  const fontColor = calculateLumaHEX(color) > 0.5 ? '#000000' : '#ffffff';
</script>

<div class="
  flex flex-col flex-grow
  overflow-hidden text-xl
  justify-center items-center
  transition-all duration-700"
  style="flex-basis: {(percentage*100)}%; background-color: {color}; color: {fontColor}"
  class:min-w-16={$ChartPositionStore === 'left'}
>
  {#if displayName}
  <span class="whitespace-nowrap">
    { name }
  </span>
  {/if}
  <span>
    { count }
  </span>
</div>