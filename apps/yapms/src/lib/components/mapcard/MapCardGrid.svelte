<script lang="ts">
	export let title: string | undefined = undefined;
</script>

<div class="flex flex-col gap-2 w-full items-center">
	{#if title !== undefined}
		<div class="text-3xl text-center lg:text-left lg:ml-4">
			{title}
		</div>
	{/if}

	<div
		class="grid grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 w-full gap-4 justify-center lg:justify-start max-w-5xl 3xl:max-w-[96rem] 4xl:max-w-[112rem]"
	>
		<slot />
	</div>
</div>
