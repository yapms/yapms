<script lang="ts">
	import { ShareDisabledModalStore } from '$lib/stores/Modals';
	import ExclamationCircle from '$lib/icons/ExclamationCircle.svelte';
	import ModalBase from '../ModalBase.svelte';
	import { exportImportAsSVG } from '$lib/utils/importMap';

	function close() {
		ShareDisabledModalStore.set({
			...$ShareDisabledModalStore,
			open: false
		});
	}
</script>

<ModalBase title="Share Functionality Disabled" open={$ShareDisabledModalStore.open}>
	<div slot="icon"><ExclamationCircle class="w-9 h-9 text-red-500" /></div>
	<div slot="content">
		<div class="flex flex-col gap-y-2">
			<p>
				Due to <a
					class="link link-primary"
					href="https://rietta.com/blog/svg-xss-injection-attacks/">security concerns</a
				> pertaining to storing and serving user generated SVG, sharing imported maps via link is not
				supported. You can, however, export this map as a YAPms formatted SVG, which can be opened by
				others. Only open or import files from people you trust!
			</p>
		</div>
	</div>
	<div slot="action">
		<button class="btn btn-secondary gap-x-1 flex-nowrap" on:click={exportImportAsSVG}
			>Export</button
		>
		<button class="btn btn-primary" on:click={close}> Okay </button>
	</div>
</ModalBase>
