<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'National Assembly',
			route: '/app/fra/assembly/2024181/blank'
		},
		{
			label: 'Departments',
			route: '/app/fra/departments/2022/blank'
		}
	];
</script>

<MapCard name="France" bg="fra" attribution="Photo by DXR on Wikimedia" {links} />
