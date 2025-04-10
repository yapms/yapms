<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'National Assembly',
			routes: [
				{
					label: 'National Assembly 2024',
					route: '/app/kor/assembly/2024101/blank'
				},
				{
					label: 'National Assembly 2020',
					route: '/app/kor/assembly/2020001/blank'
				}
			]
		},
		{
			label: '',
			routes: [
				{
					label: 'Municipalities',
					route: '/app/kor/municipalities/2018001/blank'
				}
			]
		}
	];
</script>

<MapCard
	name="South Korea"
	bg="kor"
	attribution="Photo by frakorea"
	attributionLink="https://wikipedia.org/wiki/File:Seoul-National.Assembly-02.jpg"
	{groups}
/>
