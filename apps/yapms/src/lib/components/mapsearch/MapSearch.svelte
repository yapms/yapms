<script lang="ts">
	import Typeahead from 'svelte-typeahead';
	import { goto } from '$app/navigation';

	const {
		data
	}: {
		data: { title: string; route: string }[];
	} = $props();
</script>

<Typeahead
	limit={8}
	hideLabel={true}
	{data}
	extract={(item) => item.title}
	on:select={async (selected) => {
		await goto(selected.detail.original.route);
	}}
	let:result
>
	{result.original.title}
</Typeahead>
