<script lang="ts">
	import titles from '$lib/assets/other/Titles.json';
	import Typeahead from 'svelte-typeahead';
	import { goto } from '$app/navigation';
	import MagnifyingGlass from '$lib/icons/MagnifyingGlass.svelte';

	function onSelect({ detail }: CustomEvent) {
		void goto(titles[detail.originalIndex].path);
	}
</script>

<div class="pt-6">
	<div class="px-6 md:px-0 w-full lg:w-4/6 flex">
		<MagnifyingGlass class={`pointer-events-none stroke-current my-3 pt-1 w-9 z-10 ml-2`} />
		<Typeahead
			placeholder={'Search Maps'}
			limit={8}
			hideLabel={true}
			data={titles}
			extract={(item) => item.title}
			inputAfterSelect="clear"
			on:select={onSelect}
			let:result
		>
			<div>
				{titles[result.index].title}
			</div>
		</Typeahead>
	</div>
</div>
