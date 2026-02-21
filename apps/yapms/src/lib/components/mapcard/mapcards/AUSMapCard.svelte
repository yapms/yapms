<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'House of Reps',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'House',
					modalLabel: 'House of Representatives 2025',
					route: '/app/aus/house/2025001/blank'
				},
				{
					label: '2025 Results',
					modalLabel: '2025 House of Representatives Results',
					route: '/app/aus/house/2025123/results'
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
					route: '/app/aus/senate'
				},
				{
					label: '2025 Results',
					modalLabel: '2025 Senate Results',
					route: '/app/aus/senate/2025123/results'
				},
			]
		},
		{
			label: '2022 Elections',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'House',
					modalLabel: 'House of Representatives 2022',
					route: '/app/aus/house/2022/blank'
				},
				{
					label: 'Senate',
					modalLabel: 'Senate 2022',
					route: '/app/aus/senate/2022/blank'
				},
				{
					label: 'House Results',
					modalLabel: '2022 House of Representatives Results',
					route: '/app/aus/house/2022/results'
				},
				{
					label: 'Senate Results',
					modalLabel: '2022 Senate Results',
					route: '/app/aus/senate/2022/results'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'States & Territories',
					route: '/app/aus/states/2023/blank'
				}
			]
		}
	]

	const imageLinks = [
		{
			label: 'Parliament House by Ben McCarthy',
			route: 'https://commons.wikimedia.org/wiki/File:Parliament_house3.jpg'
		},
		{
			label: 'Sydney by Allyson Fernando',
			route:
				'https://www.pexels.com/photo/drone-shot-of-the-famous-sydney-opera-house-in-australia-7549817/'
		},
		{
			label: 'Brisbane by Valeriia Miller',
			route:
				'https://www.pexels.com/photo/photo-of-bridge-and-buildings-during-golden-hour-2516657/'
		},
		{
			label: 'Uluru by Jonas Schallenberg',
			route: 'https://www.pexels.com/photo/uluru-rock-formation-in-central-australia-6610368/'
		}
	];
</script>

<MapCard
	name="Australia"
	bg="aus"
	{groups}
	{imageLinks}
	full
/>
