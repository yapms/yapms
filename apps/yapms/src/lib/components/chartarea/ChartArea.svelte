<script lang="ts">
	import { ChartTypeStore, ChartPositionStore } from '$lib/stores/Chart';
	import { LogoStore } from '$lib/stores/Logo';
	import ChartBar from '../chartbar/ChartBar.svelte';
	import BattleChart from '../chartbar/battlechart/BattleChart.svelte';

	let logoSize: { width: string | undefined; height: string | undefined } = {
		width: '100%',
		height: '100%'
	};

	$: if ($ChartPositionStore === 'bottom' && $ChartTypeStore !== 'battle') {
		logoSize = { width: 'auto', height: '50%' };
	} else if ($ChartPositionStore === 'bottom' && $ChartTypeStore === 'battle') {
		logoSize = { width: 'auto', height: '100%' };
	} else if ($ChartPositionStore === 'left' && $ChartTypeStore !== 'battle') {
		logoSize = { width: '50%', height: 'auto' };
	} else if ($ChartPositionStore === 'left' && $ChartTypeStore === 'battle') {
		logoSize = { width: '100%', height: 'auto' };
	}
</script>

<div
	class="flex justify-center items-center m-3 gap-4 overflow-hidden"
	class:hidden={$ChartTypeStore === 'none'}
	class:flex-row={$ChartPositionStore === 'bottom'}
	class:flex-col={$ChartPositionStore === 'left'}
	class:w-32={$ChartPositionStore === 'left' && $ChartTypeStore === 'battle'}
	class:h-32={$ChartPositionStore === 'bottom' && $ChartTypeStore === 'battle'}
	class:w-96={$ChartPositionStore === 'left' && $ChartTypeStore !== 'battle'}
	class:h-80={$ChartPositionStore === 'bottom' && $ChartTypeStore !== 'battle'}
>
	{#if $ChartTypeStore === 'battle'}
		<BattleChart />
	{:else}
		<ChartBar />
	{/if}
	{#if $LogoStore !== null}
		<img
			class="aspect-square"
			style:width={logoSize.width}
			style:height={logoSize.height}
			alt=""
			src={$LogoStore}
		/>
	{/if}
</div>

<div
	class="divider"
	class:divider-vertical={$ChartPositionStore === 'bottom'}
	class:h-0={$ChartPositionStore === 'bottom'}
	class:mb-0={$ChartPositionStore === 'bottom'}
	class:mt-0={$ChartPositionStore === 'bottom'}
	class:divider-horizontal={$ChartPositionStore === 'left'}
	class:w-0={$ChartPositionStore === 'left'}
	class:mr-0={$ChartPositionStore === 'left'}
	class:ml-0={$ChartPositionStore === 'left'}
/>
