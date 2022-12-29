<script lang="ts">
	import { MoreMapsModalStore } from "$lib/stores/HomeModals";
	import type HomeLinkData from "$lib/types/HomeLinkData";

    export let name: string;
    export let bg: string;
    export let alt: string;
    export let doubleCols: boolean;
    export let links: HomeLinkData[];

    function openMoreModal(key: string) {
		MoreMapsModalStore.set({
			key,
			open: true
		});
    }
</script>

<div class="card card-bordered w-80 md:w-92 h-48 lg:h-52 bg-base-100 shadow-xl image-full">
    <figure><img src={bg} alt={alt} /></figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title text-primary-content">{name}</h2>
        <div class="grid gap-4 {doubleCols ? "grid-cols-2": ""}">
            {#each links as link}
                <a class="w-full" href={link.modal ? "" : link.route}>
                    <button class="btn btn-sm btn-primary w-full" on:click={() => {link.modal ? openMoreModal(link.route) : undefined}}>{link.label}</button>
                </a>
            {/each}
        </div>
    </div>
</div>