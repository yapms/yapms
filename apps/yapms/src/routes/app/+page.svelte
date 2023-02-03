<script lang="ts">
  import { page } from "$app/stores";
  const mapID = $page.url.searchParams.get("map");
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