<script lang="ts">
	const {
		theme,
		title,
		margins
	}: {
		theme: string;
		title: string;
		margins: string[];
	} = $props();
</script>

<button class="btn p-8" data-set-theme={theme} data-act-class="ACTIVECLASS">
	<div class="flex flex-col gap-2">
		<h3>{title}</h3>
		<div class="flex flex-row gap-2">
			{#each margins as margin}
				<div
					class="outline outline-white w-4 h-4 rounded-full"
					style:background-color={margin}
				></div>
			{/each}
		</div>
	</div>
</button>
