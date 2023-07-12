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

	$: maps = titles.filter((title) => $MoreMapsModalStore.keys.indexOf(title.path) !== -1);
</script>

<ModalBase
	title="{$MoreMapsModalStore.title} Maps"
	open={$MoreMapsModalStore.open}
	stickyTitle={true}
	stickyAction={true}
>
	<div slot="content">
		<div class="tabs flex-row lg:flex-col flex-end items-center space-y-2 justify-evenly my-3">
			{#each maps as link}
				<a class="w-2/3 lg:w-1/2 btn btn-primary gap-1" href={link.path} on:click={close}>
					{link.title.replace($MoreMapsModalStore.prefix, '').toUpperCase()}
				</a>
			{/each}
		</div>
	</div>
	<div slot="action">
		<button class="btn btn-primary" on:click={close}>Close</button>
	</div>
</ModalBase>
