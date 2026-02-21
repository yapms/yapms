<script lang="ts">
	import { USAImageLinks } from './USAMapCard.svelte';
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: '',
			routes: [
				{
					label: 'Fair Map',
					route: '/app/yrc/fair/2025294/blank'
				},
				{
					label: 'Fair Map (2024 Pres)',
					route: '/app/yrc/fair/2025294/2024_pres'
				}
			]
		}
	];

</script>

<MapCard
	name="YAPms Redistricting Council"
	bg="usa"
	{groups}
	imageLinks={USAImageLinks}
/>
