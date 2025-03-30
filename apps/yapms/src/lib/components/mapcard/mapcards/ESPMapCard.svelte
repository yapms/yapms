<script lang="ts">
	import MapCard from '../MapCard.svelte';
	const links = [
		{
			label: 'Congress of Deputies',
			route: '/app/esp/deputies/2023150/blank'
		}
	];
</script>

<MapCard
	name="Spain"
	bg="esp"
	attribution="Photo by Wolfgang Pehlemann"
	attributionLink="https://commons.wikimedia.org/wiki/File:Congreso_de_los_Diputados_(1850)_heute_Palacio_de_las_Cortes_span_Parlament_Madrid_Espa%C3%B1a_-_Foto_Wolfgang_Pehlemann_P1250289.jpg"
	{links}
/>
