<script lang="ts">
	import MapCard from '../MapCard.svelte';

	const groups = [
		{
			label: undefined,
			showOnCard: true,
			showInModal: true,
			routes: [
				{
					label: '2024',
					modalLabel: 'Presidential 2024',
					route: '/app/usa/presidential/2024310/results'
				},
				{
					label: '2020',
					modalLabel: 'Presidential 2020',
					route: '/app/usa/presidential/2020/results'
				},
				{
					label: '2016',
					modalLabel: 'Presidential 2016',
					route: '/app/usa/presidential/2016/results'
				},
				{
					label: '2012',
					modalLabel: 'Presidential 2012',
					route: '/app/usa/presidential/2012/results'
				},
				{
					label: '2008',
					modalLabel: 'Presidential 2008',
					route: '/app/usa/presidential/2008/results'
				},
				{
					label: '2004',
					modalLabel: 'Presidential 2004',
					route: '/app/usa/presidential/2004/results'
				},
				{
					label: '2000',
					modalLabel: 'Presidential 2000',
					route: '/app/usa/presidential/2000/results'
				},
				{
					label: '1996',
					modalLabel: 'Presidential 1996',
					route: '/app/usa/presidential/1996/results'
				},
				{
					label: '1992',
					modalLabel: 'Presidential 1992',
					route: '/app/usa/presidential/1992/results'
				},
				{
					label: '1988',
					modalLabel: 'Presidential 1988',
					route: '/app/usa/presidential/1988/results'
				},
				{
					label: '1984',
					modalLabel: 'Presidential 1984',
					route: '/app/usa/presidential/1984/results'
				},
				{
					label: '1980',
					modalLabel: 'Presidential 1980',
					route: '/app/usa/presidential/1980/results'
				},
				{
					label: '1976',
					modalLabel: 'Presidential 1976',
					route: '/app/usa/presidential/1976/results'
				},
				{
					label: '1972',
					modalLabel: 'Presidential 1972',
					route: '/app/usa/presidential/1972/results'
				},
				{
					label: '1968',
					modalLabel: 'Presidential 1968',
					route: '/app/usa/presidential/1968/results'
				},
				{
					label: '1964',
					modalLabel: 'Presidential 1964',
					route: '/app/usa/presidential/1964/results'
				},
				{
					label: '1960',
					modalLabel: 'Presidential 1960',
					route: '/app/usa/presidential/1960/results'
				},
				{
					label: '1956',
					modalLabel: 'Presidential 1956',
					route: '/app/usa/presidential/1956/results'
				},
				{
					label: '1952',
					modalLabel: 'Presidential 1952',
					route: '/app/usa/presidential/1952/results'
				},
				{
					label: '1948',
					modalLabel: 'Presidential 1948',
					route: '/app/usa/presidential/1948/results'
				},
				{
					label: '1944',
					modalLabel: 'Presidential 1944',
					route: '/app/usa/presidential/1944/results'
				},
				{
					label: '1940',
					modalLabel: 'Presidential 1940',
					route: '/app/usa/presidential/1940/results'
				},
				{
					label: '1936',
					modalLabel: 'Presidential 1936',
					route: '/app/usa/presidential/1936/results'
				},
				{
					label: '1932',
					modalLabel: 'Presidential 1932',
					route: '/app/usa/presidential/1932/results'
				},
				{
					label: '1928',
					modalLabel: 'Presidential 1928',
					route: '/app/usa/presidential/1928/results'
				},
				{
					label: '1924',
					modalLabel: 'Presidential 1924',
					route: '/app/usa/presidential/1924/results'
				},
				{
					label: '1920',
					modalLabel: 'Presidential 1920',
					route: '/app/usa/presidential/1920/results'
				},
				{
					label: '1916',
					modalLabel: 'Presidential 1916',
					route: '/app/usa/presidential/1916/results'
				},
				{
					label: '1912',
					modalLabel: 'Presidential 1912',
					route: '/app/usa/presidential/1912/results'
				},
				{
					label: '1908',
					modalLabel: 'Presidential 1908',
					route: '/app/usa/presidential/1908/results'
				},
				{
					label: '1904',
					modalLabel: 'Presidential 1904',
					route: '/app/usa/presidential/1904/results'
				},
				{
					label: '1900',
					modalLabel: 'Presidential 1900',
					route: '/app/usa/presidential/1900/results'
				},
				{
					label: '1896',
					modalLabel: 'Presidential 1896',
					route: '/app/usa/presidential/1896/results'
				},
				{
					label: '1892',
					modalLabel: 'Presidential 1892',
					route: '/app/usa/presidential/1892/results'
				},
				{
					label: '1888',
					modalLabel: 'Presidential 1888',
					route: '/app/usa/presidential/1888/results'
				},
				{
					label: '1884',
					modalLabel: 'Presidential 1884',
					route: '/app/usa/presidential/1884/results'
				},
				{
					label: '1880',
					modalLabel: 'Presidential 1880',
					route: '/app/usa/presidential/1880/results'
				},
				{
					label: '1876',
					modalLabel: 'Presidential 1876',
					route: '/app/usa/presidential/1876/results'
				},
				{
					label: '1872',
					modalLabel: 'Presidential 1872',
					route: '/app/usa/presidential/1872/results'
				},
				{
					label: '1868',
					modalLabel: 'Presidential 1868',
					route: '/app/usa/presidential/1868/results'
				},
				{
					label: '1864',
					modalLabel: 'Presidential 1864',
					route: '/app/usa/presidential/1864/results'
				},
				{
					label: '1860',
					modalLabel: 'Presidential 1860',
					route: '/app/usa/presidential/1860/results'
				},
				{
					label: '1856',
					modalLabel: 'Presidential 1856',
					route: '/app/usa/presidential/1856/results'
				},
				{
					label: '1852',
					modalLabel: 'Presidential 1852',
					route: '/app/usa/presidential/1852/results'
				},
				{
					label: '1848',
					modalLabel: 'Presidential 1848',
					route: '/app/usa/presidential/1848/results'
				},
				{
					label: '1844',
					modalLabel: 'Presidential 1844',
					route: '/app/usa/presidential/1844/results'
				},
				{
					label: '1840',
					modalLabel: 'Presidential 1840',
					route: '/app/usa/presidential/1840/results'
				},
				{
					label: '1836',
					modalLabel: 'Presidential 1836',
					route: '/app/usa/presidential/1836/results'
				},
				{
					label: '1832',
					modalLabel: 'Presidential 1832',
					route: '/app/usa/presidential/1832/results'
				},
				{
					label: '1828',
					modalLabel: 'Presidential 1828',
					route: '/app/usa/presidential/1828/results'
				},
				{
					label: '1824',
					modalLabel: 'Presidential 1824',
					route: '/app/usa/presidential/1824/results'
				},
				{
					label: '1820',
					modalLabel: 'Presidential 1820',
					route: '/app/usa/presidential/1820/results'
				},
				{
					label: '1816',
					modalLabel: 'Presidential 1816',
					route: '/app/usa/presidential/1816/results'
				},
				{
					label: '1812',
					modalLabel: 'Presidential 1812',
					route: '/app/usa/presidential/1812/results'
				},
				{
					label: '1808',
					modalLabel: 'Presidential 1808',
					route: '/app/usa/presidential/1808/results'
				},
				{
					label: '1804',
					modalLabel: 'Presidential 1804',
					route: '/app/usa/presidential/1804/results'
				},
				{
					label: '1800',
					modalLabel: 'Presidential 1800',
					route: '/app/usa/presidential/1800/results'
				},
				{
					label: '1796',
					modalLabel: 'Presidential 1796',
					route: '/app/usa/presidential/1796/results'
				},
				{
					label: '1792',
					modalLabel: 'Presidential 1792',
					route: '/app/usa/presidential/1792/results'
				},
				{
					label: '1788',
					modalLabel: 'Presidential 1788',
					route: '/app/usa/presidential/1788/results'
				}
			]
		}
	];

	const attribution = [
		{
			label: "White House by Tom Fisk",
			route: 'https://www.pexels.com/photo/the-white-house-in-autumn-11563771/'
		},
		{
			label: 'Marine One by Adam Schultz',
			route: 'https://commons.wikimedia.org/wiki/File:Marine_One,_with_President_Joe_Biden_aboard,_approaches_the_South_Lawn_of_the_White_House,_Monday,_November_4,_2024.jpg'
		}
	];

</script>

<MapCard
	name="USA Presidential Results"
	bg="usa_pres"
	{groups}
	{attribution}
/>
