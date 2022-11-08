<script lang="ts">
	import type { Mode } from '$lib/types/Mode';

	export let onHome: () => void;
	export let onClear: () => void;
	export let onMaps: () => void;
	export let onToggleSideBar: () => void;
	export let onChartPosition: () => void;
	export let onSetMode: (newMode: Mode) => void;

	export let mode: string;
</script>

<div class="navbar bg-base-200 gap-3">
	<button class="btn btn-sm" on:click={onHome}> home </button>
	<button class="btn btn-sm" on:click={onClear}> clear </button>
	<button class="btn btn-sm" on:click={onMaps}> maps </button>
	<button class="btn btn-sm" on:click={onChartPosition}> chart position </button>
	<button class="btn btn-sm hidden md:inline" on:click={onToggleSideBar}> close sidebar </button>
	<div class="dropdown">
		<label tabindex="0" class="btn btn-sm">mode: {mode}</label>
		<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
			<li><a on:click={onSetMode('fill')}>Fill</a></li>
			<li><a on:click={onSetMode('edit')}>Edit</a></li>
		</ul>
	</div>
	<div class="dropdown">
		<label tabindex="0" class="btn btn-sm">Theme</label>
		<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
			<li><a data-set-theme="light" data-act-class="ACTIVECLASS">Light</a></li>
			<li><a data-set-theme="dark" data-act-class="ACTIVECLASS">Dark</a></li>
			<li><a data-set-theme="cupcake" data-act-class="ACTIVECLASS">Cupcake</a></li>
			<li><a data-set-theme="aqua" data-act-class="ACTIVECLASS">Aqua</a></li>
			<li><a data-set-theme="lofi" data-act-class="ACTIVECLASS">Lofi</a></li>
			<li><a data-set-theme="night" data-act-class="ACTIVECLASS">Night</a></li>
		</ul>
	</div>
</div>
