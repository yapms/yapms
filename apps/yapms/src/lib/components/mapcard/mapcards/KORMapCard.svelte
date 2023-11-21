<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'National Assembly',
			route: '/app/kor/national_assembly/2020001/blank'
		},
		{
			label: 'Municipalities',
			route: '/app/kor/municipalities/2018001/blank'
		}
	];
</script>

<MapCard
	name="South Korea"
	bg="kor"
	attribution="Photo by frakorea"
	attributionLink="https://wikipedia.org/wiki/File:Seoul-National.Assembly-02.jpg"
	{links}
/>
