<script lang="ts">
	import { SideBarStore } from '$lib/stores/SideBar';

	let sources = $derived(
		$SideBarStore.sources.map((source) => {
			return new URL(source);
		})
	);
</script>

<div class="divider">Sources</div>
<ul class="flex flex-col gap-4 m-4">
	{#each sources as source}
		<li>
			<a href={source.href} target="_blank" class="link link-info break-all">
				{source.host}
			</a>
		</li>
	{/each}
</ul>
