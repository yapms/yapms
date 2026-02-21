<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: "National Assembly '20",
			route: '/app/kor/assembly/2020001/blank'
		},
		{
			label: "National Assembly '24",
			route: '/app/kor/assembly/2024101/blank'
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
