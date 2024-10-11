<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Congress of Deputies',
			route: '/app/esp/deputies/2024/blank'
		},
		{
			label: 'Congress of Deputies 1',
			route: '/app/esp/deputies/2024/blank1'
		}
	];
</script>

<MapCard name="Spain" bg="esp" attribution="Photo by Wolfgang Pehlemann on Wikimedia" {links} />
