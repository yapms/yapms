<script lang="ts">
	import { MoreMapsModalStore } from '$lib/stores/HomeModals';
	import ModalBase from '../ModalBase.svelte';
</script>

<ModalBase title="{$MoreMapsModalStore.title} Maps" store={MoreMapsModalStore}>
	<div slot="content">
		<div class="tabs flex-row lg:flex-col flex-end items-center space-y-2 justify-evenly my-3">
			{#each $MoreMapsModalStore.buttons as button}
				<a class="w-2/3 lg:w-1/2 btn btn-primary gap-1" href={button.route} on:click={close}>
					{button.label.toUpperCase()}
				</a>
			{/each}
		</div>
	</div>
</ModalBase>
