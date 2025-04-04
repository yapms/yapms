<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'National Assembly',
			routes: [
				{
					label: 'National Assembly',
					route: '/app/svn/assembly/2022114/blank'
				},
				{
					label: '2022 Results',
					modalLabel: '2022 National Assembly Results',
					route: '/app/svn/assembly/2022114/results'
				}
			]
		},
		{
			label: '',
			routes: [
				{
					label: 'Administrative Units',
					route: '/app/svn/administrative_units/2024001/blank'
				},
				{
					label: 'Municipalities',
					route: '/app/svn/municipalities/2024001/blank'
				}
			]
		}
	];
</script>

<MapCard
	name="Slovenia"
	bg="svn"
	attribution="Photo by Philippe Hässig"
	attributionLink="https://en.wikipedia.org/wiki/File:Zgradba_Dr%C5%BEavnega_zbora.jpg"
	{groups}
/>
