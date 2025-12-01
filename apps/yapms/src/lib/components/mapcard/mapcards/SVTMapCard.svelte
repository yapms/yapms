<script lang="ts">
	import MapCard from '../../MapCard.svelte'
	const links = [
		{
			label: 'Administrative Divisions',
			route: '/app/svt/administrative_divisions/2025001/blank'
		}
	];

</script>

<MapCard
	name="Kingdom of Svetelkia"
	bg="svt" 
	attribution="Flag of Svetelkia"
	attributionLink="https://github.com/svetelkia-hub" 
	{links}
/>
