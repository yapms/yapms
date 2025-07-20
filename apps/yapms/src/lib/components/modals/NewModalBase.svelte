<script lang="ts">
	import XMark from '$lib/icons/XMark.svelte';
	import type { Snippet } from 'svelte';

	let {
		title,
		open = $bindable(false),
		onClose = undefined,
		fullWidth = false,
		header = undefined,
		content = undefined,
		action = undefined
	}: {
		title: string | undefined;
		open: boolean;
		fullWidth?: boolean;
		onClose?: (() => void) | undefined;
		header?: Snippet;
		content?: Snippet;
		action?: Snippet;
	} = $props();

	export function close() {
		if (onClose !== undefined) {
			onClose();
		} else {
			open = false;
		}
	}

	let contentElement: HTMLDivElement | undefined;
	let dialogElement: HTMLDialogElement | undefined;
	let offsetHeight: number | undefined = $state(undefined);

	let isOverflow = $derived(offsetHeight && offsetHeight < (contentElement?.scrollHeight ?? 0));

	$effect(() => {
		if (open === true) dialogElement?.showModal();
		else if (open === false) dialogElement?.close();
	});
</script>

<dialog class="modal modal-bottom lg:modal-middle" bind:this={dialogElement} onclose={close}>
	<div class="modal-box flex flex-col w-full" class:!max-w-full={fullWidth}>
		<h3 class="font-bold">
			{title ?? ''}
		</h3>

		<button class="btn btn-md btn-circle btn-ghost absolute right-4 top-4" onclick={close}>
			<XMark class="w-6 h-6" />
		</button>

		{@render header?.()}

		{#if isOverflow}
			<div class="divider pb-0 mb-0 h-0"></div>
		{/if}

		<div class="overflow-y-auto p-4" bind:this={contentElement} bind:offsetHeight>
			{@render content?.()}
		</div>

		{#if isOverflow}
			<div class="divider p-0 m-0 h-0"></div>
		{/if}

		<div class="modal-action">
			{@render action?.()}
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button onclick={close}>close</button>
	</form>
</dialog>
