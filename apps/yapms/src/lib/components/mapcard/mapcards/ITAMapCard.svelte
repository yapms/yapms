<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: 'Chamber of Deputies',
			routes: [
				{
				label: 'Chamber of Deputies',
				route: '/app/ita/deputies/2022/blank'
			},
			{
				label: '2022 Chamber Results',
				modalLabel: '2022 Chamber of Deputies Results',
				route: '/app/ita/deputies/2022/results'
			},
			]
		},
		{
			label: 'Senate',
			routes: [
				{
					label: 'Senate 2022',
					route: '/app/ita/senate/2022/blank'
				},
				
				
				{
					label: '2022 Senate Results',
					route: '/app/ita/senate/2022/results'
				}
			]
		},
		{
			label: 'Regions',
			routes: [
				{
					label: 'Regions',
					route: '/app/ita/regions/2023/blank'
				},
				{
					label: 'Provinces',
					route: '/app/ita/provinces/2023/blank'
				}
			]
		}
	];
</script>

<MapCard
	name="Italy"
	bg="ita"
	attribution="Photo by Enzo Abramo"
	attributionLink="https://www.publicdomainpictures.net/en/view-image.php?image=118762&picture=palazzo-montecitorio-in-rome"
	{groups}
	square
/>
