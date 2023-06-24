<script lang="ts">
	import { MoreMapsModalStore } from '$lib/stores/HomeModals';
	import mapList from '$lib/assets/homedata/MapList.json';
	function close() {
		MoreMapsModalStore.set({
			...$MoreMapsModalStore,
			open: false
		});
	}
	//When the key updates, get the map data corresponding to that new key as defined in MapList.json. If none exists, empty data.
	$: maps = mapList.find((elem) => elem.key === $MoreMapsModalStore.key) || {
		label: '',
		links: []
	};
</script>

<input type="checkbox" class="modal-toggle" checked={$MoreMapsModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<h2 class="text-2xl">{maps.label} Maps</h2>
		<br />
		<div class="tabs flex-row lg:flex-col flex-end items-center space-y-2 justify-evenly">
			{#each maps.links as link}
				<a class="w-2/3 lg:w-1/2 btn btn-primary gap-1" href={link.route} on:click={close}>
					{link.label.toUpperCase()}
				</a>
			{/each}
		</div>
		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}>Close</button>
		</div>
	</div>
</div>