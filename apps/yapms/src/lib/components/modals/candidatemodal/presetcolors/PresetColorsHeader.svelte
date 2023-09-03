<script lang="ts">
	export let tab: number = 0;
</script>

<div class="tabs">
	<button class="tab tab-bordered tab-lg" class:tab-active={tab === 0} on:click={() => (tab = 0)}>
		Classic
	</button>
	<button class="tab tab-bordered tab-lg" class:tab-active={tab === 1} on:click={() => (tab = 1)}>
		Wikipedia
	</button>
	<button class="tab tab-bordered tab-lg" class:tab-active={tab === 2} on:click={() => (tab = 2)}>
		Custom
	</button>
</div>
