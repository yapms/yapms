<script lang="ts">
	export let title: string | undefined = undefined;
</script>

{#if title !== undefined}
	<div class="text-2xl text-center md:text-left text-bold pr-5 mt-4">
		{title}
	</div>
{/if}

<div
	class="flex w-full mt-5 lg:mr-10 flex-wrap gap-y-4 justify-center md:justify-start gap-x-4 overflow-y-auto"
>
	<slot />
</div>
