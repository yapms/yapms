<script lang="ts">
	import type { HomeGroupData, HomeLinkData } from '$lib/types/HomeData';
	import MapCard from '../MapCard.svelte';
	const groups = [
		{
			label: '',
			routes: [
				{
					label: 'Presidential',
					route: '/app/yap/presidential/2025285/blank'
				}
			]
		},
		{
			label: 'Senate',
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

	const imageLinks: HomeLinkData[] = [];

</script>

<MapCard name="Yapmeria" bg="yap" {groups} {imageLinks} />
