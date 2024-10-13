<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Congress of Deputies',
			route: '/app/esp/deputies/2024/blank'
		}
	];
</script>

<MapCard name="Spain" bg="esp" attribution="Photo by Wolfgang Pehlemann on Wikimedia" {links} />
