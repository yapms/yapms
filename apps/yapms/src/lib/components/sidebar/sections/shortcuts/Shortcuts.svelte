<script lang="ts">
	import { ActionGroups, SelectedActionGroup } from '$lib/stores/ActionGroups';
</script>

<div class="hidden sm:divider">Shortcuts</div>

<div class="hidden sm:grid grid-cols-[auto_auto] gap-2 m-4">
	<div class="text-right content-center">Hold <kbd class="kbd">f</kbd></div>
	<div>Quickly fill in regions.</div>

	<div class="text-right content-center">Hold <kbd class="kbd">ctrl</kbd></div>
	<div>Decrement colors.</div>

	<div class="text-right content-center">Press <kbd class="kbd">r</kbd></div>
	<div>Recenter map.</div>

	<div class="text-right content-center">
		Press <kbd class="kbd">0</kbd> - <kbd class="kbd">9</kbd>
	</div>
	<div>Switch candidates.</div>

	<div class="col-span-2 text-center content-center">
		Press
		<div class="flex flex-wrap justify-center gap-x-1 mt-1">
			<kbd class="kbd">h</kbd>
			<kbd class="kbd">c</kbd>
			<kbd class="kbd">i</kbd>
			<kbd class="kbd">o</kbd>
			<kbd class="kbd">m</kbd>
			<kbd class="kbd">s</kbd>
			<kbd class="kbd">t</kbd>
			<kbd class="kbd">l</kbd>
		</div>
		to toggle menus.
	</div>

	{#if $ActionGroups.length !== 0}
		<div class="text-right content-center">Hold <kbd class="kbd">g</kbd></div>
		<div class="flex flex-col">
			<span>Fill in...</span>
			<select class="select select-secondary select-xs" bind:value={$SelectedActionGroup}>
				{#each $ActionGroups as groupName, index}
					<option value={index}>{groupName}</option>
				{/each}
			</select>
		</div>

		<div class="text-right content-center">Hold <kbd class="kbd">G</kbd></div>
		<div>
			<span>Fill in every other...</span>
			<select class="select select-secondary select-xs" bind:value={$SelectedActionGroup}>
				{#each $ActionGroups as groupName, index}
					<option value={index}>{groupName}</option>
				{/each}
			</select>
		</div>
	{/if}
</div>
