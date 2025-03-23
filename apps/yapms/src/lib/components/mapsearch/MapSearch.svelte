<script lang="ts">
	import Typeahead from 'svelte-typeahead';
	import MagnifyingGlass from '$lib/icons/MagnifyingGlass.svelte';
	import { goto } from '$app/navigation';

	export let data: { title: string; route: string }[] = [];
</script>

<div class="pt-6">
	<div class="px-6 md:px-0 w-full lg:w-4/6 flex">
		<MagnifyingGlass class="pointer-events-none stroke-current my-3 pt-1 w-9 z-10 ml-2" />
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
	</div>
</div>
