<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Lok Sabha',
			route: '/app/ind/lok_sabha/2024109/blank'
		},
		{
			label: 'States',
			route: '/app/ind/states/2024001/blank'
		}
	];
</script>

<MapCard
	name="India"
	bg="ind"
	attribution="Photo by Indian Ministry of Parliamentary Affairs"
	attributionLink="https://commons.wikimedia.org/wiki/File:Glimpse_of_the_new_Parliament_Building,_in_New_Delhi.jpg"
	{links}
/>
