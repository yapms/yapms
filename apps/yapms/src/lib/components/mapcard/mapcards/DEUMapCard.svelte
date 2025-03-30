<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Bundestag',
			route: '/app/deu/bundestag/2021269/blank'
		},
		{
			label: 'Results 2021',
			route: '/app/deu/bundestag/2021269/results'
		},
		{
			label: 'Bundesrat',
			route: '/app/deu/bundesrat/2023001/blank'
		},
		{
			label: 'States',
			route: '/app/deu/states/2023001/blank'
		}
	];
</script>

<MapCard
	name="Germany"
	bg="deu"
	attribution="Photo by Guy Percival"
	attributionLink="https://www.publicdomainpictures.net/en/view-image.php?image=307270&picture=reichstag-building-in-berlin"
	{links}
/>
