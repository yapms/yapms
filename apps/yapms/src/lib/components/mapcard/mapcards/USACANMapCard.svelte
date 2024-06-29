<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const links = [
		{
			label: 'States',
			route: '/app/usa_can/states/2024001/blank'
		}
	];
</script>

<MapCard
	name="United States & Canada"
	bg="usacan"
	attribution="US Embassy & Consulates in Canada"
	{links}
	attributionLink="https://ca.usembassy.gov/united-states-canada-strength-partnership/"
/>
