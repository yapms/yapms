<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Presidential',
					route: '/app/yap/presidential/2025285/blank'
				}
			]
		},
		{
			label: 'Senate',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Senate',
					route: '/app/yap/senate/2026025/blank'
				},
				{
					label: 'Senate (Old)',
					route: '/app/yap/senate/2025285/blank'
				}
			]
		}
	];

	const imageLinks = [
		{
			label: 'Yapmeria flag from the Yapmeria Wiki',
			route: 'https://yapmeria.miraheze.org/wiki/File:Flag_of_Yapmeria.webp'
		}
	]

</script>

<MapCard name="Yapmeria" bg="yap" {groups} {imageLinks} />
