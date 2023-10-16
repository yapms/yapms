<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Departments',
			route: '/app/fra/departments/2022/blank'
		}
	];
</script>

<MapCard name="France" bg="fra" attribution="Photo by DXR on Wikimedia" {links} />
