<script lang="ts">
	import type { Snippet } from 'svelte';

	const { title = undefined, children }: { title?: string | undefined; children: Snippet } =
		$props();
</script>

<div class="flex flex-col gap-2">
	{#if title !== undefined}
		<div class="text-3xl text-center lg:text-left lg:ml-4">
			{title}
		</div>
	{/if}

	<div class="flex w-full flex-wrap gap-4 justify-center lg:justify-start">
		{@render children()}
	</div>
</div>
