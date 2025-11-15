<script lang="ts">
	const {
		title,
		description
	}: {
		title: string;
		description: string;
	} = $props();
</script>

<div class="card card-bordered bg-base-300 shadow-md p-3">
	<div class="text-xl text-left font-semibold pb-2">
		{title}
	</div>
	<div class="text-md text-left">
		{description}
	</div>
</div>
