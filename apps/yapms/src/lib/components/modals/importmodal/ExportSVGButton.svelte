<script>
	import { page } from '$app/stores';
	import { ImportedSVGStore } from '$lib/stores/ImportedSVG';
	import { exportImportAsSVG } from '$lib/utils/importMap';
</script>

{#if $page.url.pathname !== '/app/imported' || $ImportedSVGStore.loaded === false}
	<div class="tooltip" data-tip="Import a map to export an SVG">
		<button class="btn btn-primary" disabled={true} on:click={exportImportAsSVG}>
			Export SVG
		</button>
	</div>
{:else}
	<button class="btn btn-primary" disabled={false} on:click={exportImportAsSVG}>
		Export SVG
	</button>
{/if}
