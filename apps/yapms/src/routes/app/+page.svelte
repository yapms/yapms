<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
  import { page } from "$app/stores";
	import { loadFromJson } from "$lib/utils/loadMap";

  const mapID = $page.url.searchParams.get("map");
  onMount(async () => {
    const response = await fetch(`http://localhost:8080/api/files/maps/${mapID}/data.json.gz`);
    const mapData = await response.json();
    console.log(mapData);
    loadFromJson(mapData);
    await goto(`/app/usa/presidential/2022?map=${mapID}`);
  });
</script>

<svelte:head>
  <title>YAPms</title>
  <meta property="og:title" content="YAPms - {mapID}" />
  <meta property="og:description" content="Yet Another Political Map Simulator" />
  <meta property="twitter:description" content="Yet Another Political Map Simulator" />
</svelte:head>

<div>
  Please wait while we redirect you to the map you requested...
</div>