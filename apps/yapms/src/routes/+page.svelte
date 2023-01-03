<script>
	import HomePageSidebar from "$lib/components/homepage/HomePageSidebar.svelte";
	import MapSelectionGrid from "$lib/components/homepage/MapSelectionGrid.svelte";
	import MapSelectionTitle from "$lib/components/homepage/MapSelectionTitle.svelte";
	import Login from '$lib/icons/Login.svelte';
	import mapSelectSections from '$lib/assets/homedata/MapSelection.json';
	import MapSelectionCard from "$lib/components/homepage/MapSelectionCard.svelte";
	import MoreMapsModal from "$lib/components/modals/moremapsmodal/MoreMapsModal.svelte";

</script>

<svelte:head>
	<title>YAPms - Yet Another Political Map Simulator</title>
</svelte:head>

<div class="flex flex-col h-full overflow-hidden">

	<div class="navbar bg-base-200">
		<div class="navbar-start"></div>
		<div class="navbar-center">
			<h1 class="text-2xl font-bold m-auto hidden lg:inline">Yet Another Political Map Simulator</h1>
			<h1 class="text-2xl font-bold m-auto inline lg:hidden">YAPms</h1>
		</div>
		<div class="navbar-end">
			<button class="btn px-8 btn-primary mr-2 hidden md:inline">Login</button>
			<button class="btn btn-square mr-2 inline md:hidden"><Login class="h-8 m-auto"/></button>
		</div>
	</div>

	<div class="flex flex-row h-full overflow-hidden">
		<HomePageSidebar/>
		<div class="divider md:divider-horizontal ml-0 w-0" />
		<div class="flex-1 md:pr-5 overflow-auto overflow-x-clip">
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
	
</div>

<MoreMapsModal/>
