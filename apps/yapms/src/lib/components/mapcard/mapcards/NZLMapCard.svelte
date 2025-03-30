<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'House',
			route: '/app/nzl/house/2023/blank'
		},
		{
			label: 'Māori Electorates',
			route: '/app/nzl/maori/2023/blank'
		},
		{
			label: 'Regional Councils',
			route: '/app/nzl/regions/2023/blank'
		},
		{
			label: 'Results 2023',
			route: '/app/nzl/house/2023303/results'
		},
		{
			label: 'Results 2020',
			route: '/app/nzl/house/2020/results'
		}
	];
</script>

<MapCard
	name="New Zealand"
	bg="nzl"
	attribution="Photo by 飞谢"
	attributionLink="https://www.pexels.com/photo/the-beehive-building-in-wellington-new-zealand-10116189/"
	{links}
/>
