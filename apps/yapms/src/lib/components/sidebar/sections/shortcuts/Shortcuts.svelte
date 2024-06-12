<script lang="ts">
	import { ActionGroups, SelectedActionGroup } from '$lib/stores/ActionGroups';
</script>

<div class="hidden sm:divider">Shortcuts</div>
<div class="hidden sm:flex flex-col gap-4 p-2">
	<div class="flex justify-center items-center gap-2">
		<span>Hold</span>
		<kbd class="kbd">f</kbd>
		<span>to quickly fill in regions</span>
	</div>
	{#if $ActionGroups.length !== 0}
		<div class="flex justify-center items-center gap-2">
			<span>Hold</span>
			<kbd class="kbd">g</kbd>
			<span>to fill in</span>
			<select class="select select-secondary select-sm" bind:value={$SelectedActionGroup}>
				{#each $ActionGroups as groupName, index}
					<option value={index}>{groupName}</option>
				{/each}
			</select>
		</div>
		<div class="flex justify-center items-center gap-2">
			<span>Hold</span>
			<kbd class="kbd text-nowrap">G</kbd>
			<span>to fill every other</span>
			<select class="select select-secondary select-sm" bind:value={$SelectedActionGroup}>
				{#each $ActionGroups as groupName, index}
					<option value={index}>{groupName}</option>
				{/each}
			</select>
		</div>
	{/if}
	<div class="flex justify-center items-center gap-2">
		<span>Hold</span>
		<kbd class="kbd">ctrl</kbd>
		<span>to decrement colors</span>
	</div>
	<div class="flex justify-center items-center gap-2">
		<span>Press</span>
		<kbd class="kbd">shift</kbd>
		+
		<kbd class="kbd">r</kbd>
		<span>to recenter map</span>
	</div>
</div>
