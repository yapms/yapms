<script lang="ts">
	import MapCard from '../MapCard.svelte';
	
	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'House 2026',
					route: '/app/jpn/house/2026019/blank'
				},
				{
					label: 'House 2024',
					route: '/app/jpn/house/2022330/blank'
				},
				{
					label: 'House 2021',
					route: '/app/jpn/house/2021305/blank'
				}
			]
		}
	]

	const attribution = [
		{
			label: 'National Diet Building by Kakidai',
			route: 'https://commons.wikimedia.org/wiki/File:National_Diet_Building_02.jpg'
		},
		{
			label: 'Tokyo Tower by Supanut Arunoprayote',
			route: 'https://commons.wikimedia.org/wiki/File:Tokyo_Tower,_View_from_Yebisu_Garden_Place_20241020_(II).jpg'
		}
	]

</script>

<MapCard
	name="Japan"
	bg="jpn"
	{groups}
	{attribution}
/>
