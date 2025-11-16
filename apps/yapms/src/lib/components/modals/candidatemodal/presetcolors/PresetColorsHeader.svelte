<script lang="ts">
	let {
		tab = $bindable(0)
	}: {
		tab?: number;
	} = $props();
</script>

<div class="tabs">
	<button class="tab tab-bordered tab-lg" class:tab-active={tab === 0} onclick={() => (tab = 0)}>
		Classic
	</button>
	<button class="tab tab-bordered tab-lg" class:tab-active={tab === 1} onclick={() => (tab = 1)}>
		Wikipedia
	</button>
	<button class="tab tab-bordered tab-lg" class:tab-active={tab === 2} onclick={() => (tab = 2)}>
		Custom
	</button>
</div>
