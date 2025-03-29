<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: '2024',
			route: '/app/usa/presidential/2024310/results'
		},
		{
			label: '2020',
			route: '/app/usa/presidential/2020/results'
		},
		{
			label: '2016',
			route: '/app/usa/presidential/2016/results'
		},
		{
			label: 'Presidential 2024',
			route: '/app/usa/presidential/2024310/results'
		},
		{
			label: 'Presidential 2020',
			route: '/app/usa/presidential/2020/results'
		},
		{
			label: 'Presidential 2016',
			route: '/app/usa/presidential/2016/results'
		},
		{
			label: 'Presidential 2012',
			route: '/app/usa/presidential/2012/results'
		},
		{
			label: 'Presidential 2008',
			route: '/app/usa/presidential/2008/results'
		},
		{
			label: 'Presidential 2004',
			route: '/app/usa/presidential/2004/results'
		},
		{
			label: 'Presidential 2000',
			route: '/app/usa/presidential/2000/results'
		},
		{
			label: 'Presidential 1996',
			route: '/app/usa/presidential/1996/results'
		},
		{
			label: 'Presidential 1992',
			route: '/app/usa/presidential/1992/results'
		},
		{
			label: 'Presidential 1988',
			route: '/app/usa/presidential/1988/results'
		},
		{
			label: 'Presidential 1984',
			route: '/app/usa/presidential/1984/results'
		},
		{
			label: 'Presidential 1980',
			route: '/app/usa/presidential/1980/results'
		},
		{
			label: 'Presidential 1976',
			route: '/app/usa/presidential/1976/results'
		},
		{
			label: 'Presidential 1972',
			route: '/app/usa/presidential/1972/results'
		},
		{
			label: 'Presidential 1968',
			route: '/app/usa/presidential/1968/results'
		},
		{
			label: 'Presidential 1964',
			route: '/app/usa/presidential/1964/results'
		},
		{
			label: 'Presidential 1960',
			route: '/app/usa/presidential/1960/results'
		},
		{
			label: 'Presidential 1956',
			route: '/app/usa/presidential/1956/results'
		},
		{
			label: 'Presidential 1952',
			route: '/app/usa/presidential/1952/results'
		},
		{
			label: 'Presidential 1948',
			route: '/app/usa/presidential/1948/results'
		},
		{
			label: 'Presidential 1944',
			route: '/app/usa/presidential/1944/results'
		},
		{
			label: 'Presidential 1940',
			route: '/app/usa/presidential/1940/results'
		},
		{
			label: 'Presidential 1936',
			route: '/app/usa/presidential/1936/results'
		},
		{
			label: 'Presidential 1932',
			route: '/app/usa/presidential/1932/results'
		},
		{
			label: 'Presidential 1928',
			route: '/app/usa/presidential/1928/results'
		},
		{
			label: 'Presidential 1924',
			route: '/app/usa/presidential/1924/results'
		},
		{
			label: 'Presidential 1920',
			route: '/app/usa/presidential/1920/results'
		},
		{
			label: 'Presidential 1916',
			route: '/app/usa/presidential/1916/results'
		},
		{
			label: 'Presidential 1912',
			route: '/app/usa/presidential/1912/results'
		},
		{
			label: 'Presidential 1908',
			route: '/app/usa/presidential/1908/results'
		},
		{
			label: 'Presidential 1904',
			route: '/app/usa/presidential/1904/results'
		},
		{
			label: 'Presidential 1900',
			route: '/app/usa/presidential/1900/results'
		},
		{
			label: 'Presidential 1896',
			route: '/app/usa/presidential/1896/results'
		},
		{
			label: 'Presidential 1892',
			route: '/app/usa/presidential/1892/results'
		},
		{
			label: 'Presidential 1888',
			route: '/app/usa/presidential/1888/results'
		},
		{
			label: 'Presidential 1884',
			route: '/app/usa/presidential/1884/results'
		},
		{
			label: 'Presidential 1880',
			route: '/app/usa/presidential/1880/results'
		},
		{
			label: 'Presidential 1876',
			route: '/app/usa/presidential/1876/results'
		},
		{
			label: 'Presidential 1872',
			route: '/app/usa/presidential/1872/results'
		},
		{
			label: 'Presidential 1868',
			route: '/app/usa/presidential/1868/results'
		},
		{
			label: 'Presidential 1864',
			route: '/app/usa/presidential/1864/results'
		},
		{
			label: 'Presidential 1860',
			route: '/app/usa/presidential/1860/results'
		},
		{
			label: 'Presidential 1856',
			route: '/app/usa/presidential/1856/results'
		},
		{
			label: 'Presidential 1852',
			route: '/app/usa/presidential/1852/results'
		},
		{
			label: 'Presidential 1848',
			route: '/app/usa/presidential/1848/results'
		},
		{
			label: 'Presidential 1844',
			route: '/app/usa/presidential/1844/results'
		},
		{
			label: 'Presidential 1840',
			route: '/app/usa/presidential/1840/results'
		},
		{
			label: 'Presidential 1836',
			route: '/app/usa/presidential/1836/results'
		},
		{
			label: 'Presidential 1832',
			route: '/app/usa/presidential/1832/results'
		},
		{
			label: 'Presidential 1828',
			route: '/app/usa/presidential/1828/results'
		},
		{
			label: 'Presidential 1824',
			route: '/app/usa/presidential/1824/results'
		},
		{
			label: 'Presidential 1820',
			route: '/app/usa/presidential/1820/results'
		},
		{
			label: 'Presidential 1816',
			route: '/app/usa/presidential/1816/results'
		},
		{
			label: 'Presidential 1812',
			route: '/app/usa/presidential/1812/results'
		},
		{
			label: 'Presidential 1808',
			route: '/app/usa/presidential/1808/results'
		},
		{
			label: 'Presidential 1804',
			route: '/app/usa/presidential/1804/results'
		},
		{
			label: 'Presidential 1800',
			route: '/app/usa/presidential/1800/results'
		},
		{
			label: 'Presidential 1796',
			route: '/app/usa/presidential/1796/results'
		},
		{
			label: 'Presidential 1792',
			route: '/app/usa/presidential/1792/results'
		},
		{
			label: 'Presidential 1788',
			route: '/app/usa/presidential/1788/results'
		}
	];
</script>

<MapCard
	name="USA Presidential Results"
	bg="usapres"
	attribution="Photo by Tom Fisk"
	attributionLink="https://www.pexels.com/photo/the-white-house-in-autumn-11563771/"
	{links}
/>
