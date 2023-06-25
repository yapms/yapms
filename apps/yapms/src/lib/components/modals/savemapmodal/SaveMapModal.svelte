<script lang="ts">
	import { get } from 'svelte/store';
	import ModalBase from '../ModalBase.svelte';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { generateJson } from '$lib/utils/saveMap';

	let mapList: Array<Record<any, any>> = [];

	async function saveMap() {
		const form = new FormData();
		const mapData = new File([JSON.stringify(generateJson())], 'data.json', {
			type: 'application/json'
		});
		form.append('data', mapData);

		const record = await $PocketBaseStore.collection('named_maps').create(form);
	}

	async function getMapList() {
		mapList = await $PocketBaseStore.collection('named_maps').getFullList();
		console.log(mapList);
	}
</script>

<ModalBase title="Saved Maps" open={false}>
	<div slot="content">
		<button class="btn" on:click={getMapList}>get</button>
		{#each mapList as map}
			<div>{map.id}</div>
		{/each}
	</div>
</ModalBase>
