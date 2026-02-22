<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: 'Assembly',
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Assembly 2025',
					route: '/app/prt/assembly/2025138/blank'
				},
				{
					label: '2024 Results',
					route: '/app/prt/assembly/2024070/results'
				}
			]
		},
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: 'Districts',
					route: '/app/prt/districts/2021093/blank'
				},
				{
					label: 'Municipalities',
					route: '/app/prt/municipalities/2018316/blank'
				},
				{
					label: 'Assembly 2024',
					route: '/app/prt/assembly/2024070/blank'
				}
			]
		}
	];
	
	const attribution = [
		{
			label: 'São Bento Palace by Max Avans',
			route: 'https://www.pexels.com/photo/white-concrete-building-under-blue-sky-5072289/'
		},
		{
			label: 'Padrão dos Descobrimentos with Ponte 25 de Abril by DimiTalen',
			route: 'https://commons.wikimedia.org/wiki/File:Padr%C3%A3o_dos_Descobrimentos_with_Ponte_25_de_Abril_in_the_background,_Lisbon,_2010.jpg'
		}
	];

</script>

<MapCard
	name="Portugal"
	bg="prt"
	{groups}
	{attribution}
/>
