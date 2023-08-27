<script lang="ts">
	import { OriginalSourceStore } from '$lib/stores/OriginalSource';

	$: sources = $OriginalSourceStore.map((source) => {
		return new URL(source);
	});
</script>

<div class="divider">Sources</div>
<ul class="flex flex-col gap-4 p-4">
	{#each sources as source}
		<li>
			<a href={source.href} target="_blank" class="btn btn-neutral break-all w-full"
				>{source.host}</a
			>
		</li>
	{/each}
</ul>
