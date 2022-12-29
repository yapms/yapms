<script>
	import HomePageSidebar from "$lib/components/homePage/homePageSidebar.svelte";
	import MapSelectionGrid from "$lib/components/homePage/mapSelectionGrid.svelte";
	import MapSelectionTitle from "$lib/components/homePage/mapSelectionTitle.svelte";
	import Login from '$lib/icons/Login.svelte';
	import mapSelectSections from '$lib/assets/other/MapSelection.json';
	import MapSelectionCard from "$lib/components/homePage/MapSelectionCard.svelte";
	import MoreMapsModal from "$lib/components/modals/moremapsmodal/MoreMapsModal.svelte";

</script>
<div class="navbar bg-base-200 h-[10%]">
	<div class="navbar-start"></div>
	<div class="navbar-center">
		<h1 class="text-2xl font-bold m-auto hidden lg:inline">Yet Another Political Map Simulator</h1>
		<h1 class="text-2xl font-bold m-auto inline lg:hidden">YAPms</h1>
	</div>
	<div class="navbar-end">
		<button class="btn px-8 btn-primary mr-2 hidden md:inline">Login</button> <!--needs to change into icon when screen small-->
		<button class="btn btn-square mr-2 inline md:hidden"><Login class="h-8 m-auto"/></button>
	</div>
</div>

<svelte:head>
	<title>YAPms - Yet Another Political Map Simulator</title>
</svelte:head>

<div class="flex flex-row w-full h-[90%]">
	<HomePageSidebar/>
	<div class="divider md:divider-horizontal ml-0 w-0" />
	<div class="flex-1 md:pr-5 overflow-y-auto overflow-x-clip">
		{#each mapSelectSections as section}
			<MapSelectionTitle title={section.title}></MapSelectionTitle>
			<MapSelectionGrid>
				{#each section.cards as card}
					<MapSelectionCard name={card.name} bg={card.bg} alt={card.alt} doubleCols={card.doubleCols} links={card.links}></MapSelectionCard>
				{/each}
			</MapSelectionGrid>
		{/each}
	</div>
</div>

<MoreMapsModal/>
