<script lang="ts">
	import { MoreMapsModalStore } from '$lib/stores/HomeModals';
	import titles from '$lib/assets/other/Titles.json';
	import ModalBase from '../ModalBase.svelte';

	function close() {
		MoreMapsModalStore.set({
			...$MoreMapsModalStore,
			open: false
		});
	}

	//When the key updates, get the map data corresponding to that new key as defined in titles.json. If none exists, empty data.
	$: maps = titles.filter((elem) => elem.path.startsWith(`/app/${$MoreMapsModalStore.key}`)) || [];
	$: namespace = titles.find((elem) => elem.path === $MoreMapsModalStore.key);
</script>

<ModalBase
	title="{namespace !== undefined ? namespace.title : ''} Maps"
	open={$MoreMapsModalStore.open}
>
	<div slot="content">
		<div class="tabs flex-row lg:flex-col flex-end items-center space-y-2 justify-evenly">
			{#each maps as map}
				<a class="w-2/3 lg:w-1/2 btn btn-primary" href={map.path} on:click={close}>
					{map.title}
				</a>
			{/each}
		</div>
	</div>
	<div slot="action">
		<button class="btn btn-primary" on:click={close}>Close</button>
	</div>
</ModalBase>
