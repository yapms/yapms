<script lang="ts">
	import { MoreMapsModalStore } from '$lib/stores/HomeModals';
	import ModalBase from '../ModalBase.svelte';
	function close(event: MouseEvent) {
		if (!event.ctrlKey) {
			MoreMapsModalStore.set({
				...$MoreMapsModalStore,
				open: false
			});
		}
	}
</script>

<ModalBase title="{$MoreMapsModalStore.title} Maps" open={$MoreMapsModalStore.open} sticky>
	<div slot="content">
		<div class="tabs flex-row lg:flex-col flex-end items-center space-y-2 justify-evenly my-3">
			{#each $MoreMapsModalStore.buttons as button}
				<a class="w-2/3 lg:w-1/2 btn btn-primary gap-1" href={button.route} on:click={close}>
					{button.label.toUpperCase()}
				</a>
			{/each}
		</div>
	</div>
	<div slot="action">
		<button class="btn btn-primary" on:click={close}>Close</button>
	</div>
</ModalBase>
