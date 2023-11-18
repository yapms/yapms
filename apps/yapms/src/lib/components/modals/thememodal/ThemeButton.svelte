<script lang="ts">
	export let theme: string;
	export let title: string;
	export let margins: string[];
</script>

<button class="btn btn-lg" data-set-theme={theme} data-act-class="ACTIVECLASS">
	<div class="flex flex-col gap-2">
		<h3>{title}</h3>
		<div class="flex flex-row gap-2">
			{#each margins as margin}
				<div
					class="outline outline-1 outline-white w-4 h-4 rounded-full"
					style:background-color={margin}
				/>
			{/each}
		</div>
	</div>
</button>
