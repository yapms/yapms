<script lang="ts">
	export let onHome: () => void;
	export let onClear: () => void;
	export let onMaps: () => void;
	export let onToggleSideBar: () => void;
	export let onChartPosition: () => void;
</script>

<div class="navbar bg-base-200 gap-3">
	<button class="btn btn-sm" on:click={onHome}> home </button>
	<button class="btn btn-sm" on:click={onClear}> clear </button>
	<button class="btn btn-sm" on:click={onMaps}> maps </button>
	<button class="btn btn-sm" on:click={onChartPosition}> chart position </button>
	<button class="btn btn-sm" on:click={onToggleSideBar}> close sidebar </button>
</div>
