<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Tasmania Assembly',
			route: '/app/aus/tas_lower/2024082/blank'
		},
		{
			label: 'Tasmania Council',
			route: '/app/aus/tas_upper/2025145/blank'
		},
		{
			route: '/app/aus/sa/2026080/v2',
			label: 'South Australia'
		},
		{
			route: '/app/aus/act/2024292/blank',
			label: 'Australian Capital Territory 2024'
		},
		{
			route: '/app/aus/nsw/2023084/blank',
			label: 'New South Wales 2023'
		},
		{
			route: '/app/aus/nt/2024326/blank',
			label: 'Northern Territory 2024'
		},
		{
			route: '/app/aus/qld/2024299/blank',
			label: 'Queensland 2024'
		},
		{
			route: '/app/aus/sa/2026080/v2',
			label: 'South Australia 2026'
		},
		{
			route: '/app/aus/sa/2022078/blank',
			label: 'South Australia 2022'
		},
		{
			route: '/app/aus/tas_lower/2024082/blank',
			label: 'Tasmania House of Assembly 2024'
		},
		{
			route: '/app/aus/tas_upper/2025145/blank',
			label: 'Tasmania Legislative Council 2025'
		},
		{
			route: '/app/aus/vic_lower/2022330/blank',
			label: 'Victoria Legislative Assembly 2022'
		},
		{
			route: '/app/aus/vic_upper/2022330/blank',
			label: 'Victoria Legislative Council 2022'
		},
		{
			route: '/app/aus/wa/2025067/blank',
			label: 'Western Australia 2025'
		}
	];
</script>

<MapCard
	name="Australian States"
	bg="auslegassem"
	attribution="Photo by Figaro"
	attributionLink="https://commons.wikimedia.org/wiki/Category:Parliament_House,_Brisbane#/media/File:Parliament-House-Brisbane-2.jpg"
	{links}
/>
