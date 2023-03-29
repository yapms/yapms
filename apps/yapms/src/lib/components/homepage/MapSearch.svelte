<script lang="ts">
	import titles from '$lib/assets/other/Titles.json';
	import Typeahead from 'svelte-typeahead';
	import { goto } from '$app/navigation';
	import Search from '$lib/icons/Search.svelte';

	function onSelect({ detail }: CustomEvent) {
		void goto(titles[detail.originalIndex].path);
	}
</script>

<div class="pt-6">
	<div class="px-6 md:px-0 w-full lg:w-4/6 flex">
		<Search class={`pointer-events-none stroke-current my-3 pt-1 w-9 z-10 ml-2`}
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/></Search
		>
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
