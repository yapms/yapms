<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'National Assembly',
			route: '/app/zaf/assembly/2019128/blank'
		},
		{
			label: '2019 Results',
			route: '/app/zaf/assembly/2019128/results'
		},
		{
			label: 'Provinces',
			route: '/app/zaf/provinces'
		},
		{
			label: 'Municipalities',
			route: '/app/zaf/municipalities/2019275/blank'
		}
	];
</script>

<MapCard
	name="South Africa"
	bg="zaf"
	attribution="Photo by Clayton"
	attributionLink="https://www.pexels.com/photo/the-statue-of-nelson-mandela-on-the-union-buildings-grounds-pretoria-gauteng-south-africa-10527763/"
	{links}
/>
