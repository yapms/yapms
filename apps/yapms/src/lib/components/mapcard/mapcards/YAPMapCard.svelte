<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Presidential',
			route: '/app/yap/presidential/2025285/blank'
		},
		{
			label: 'Senate',
			route: '/app/yap/senate/2026025/blank'
		},
		{
			label: 'Senate (Old)',
			route: '/app/yap/senate/2025285/blank'
		}
	];
</script>

<MapCard name="Yapmeria" bg="yap" attribution="" attributionLink="" {links} />
