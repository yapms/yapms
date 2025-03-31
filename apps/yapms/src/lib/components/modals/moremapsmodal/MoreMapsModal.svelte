<script lang="ts">
	import { MoreMapsModalStore } from '$lib/stores/HomeModals';
	import ModalBase from '../ModalBase.svelte';

	function close(event: MouseEvent) {
		if (!event.ctrlKey) $MoreMapsModalStore.open = false;
	}
</script>

<ModalBase title="{$MoreMapsModalStore.title} Maps" store={MoreMapsModalStore}>
	<div slot="content">
		<div class="flex flex-col gap-3 items-center">
			{#each $MoreMapsModalStore.buttons as button}
				<a class="btn btn-primary w-2/3 leading-3.5" href={button.route} on:click={close}>
					{button.label}
				</a>
			{/each}
		</div>
	</div>
</ModalBase>
