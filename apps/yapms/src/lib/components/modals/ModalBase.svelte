<script lang="ts">
	import XMark from '$lib/icons/XMark.svelte';
	import type { Writable } from 'svelte/store';

	export let title: string | undefined = undefined;

	export let fullWidth: boolean = false;

	export let store: Writable<{ open: boolean }>;
	export let onClose: (() => void) | undefined = undefined;

	export function close() {
		if (onClose !== undefined) {
			onClose();
		} else if ($store !== undefined) {
			$store.open = false;
		}
	}

	let content: HTMLDivElement | undefined;
	let dialog: HTMLDialogElement | undefined;
	let offsetHeight: number | undefined;

	$: isOverflow = offsetHeight && offsetHeight < (content?.scrollHeight ?? 0);

	$: if ($store.open) dialog?.showModal();

	$: if (!$store.open) dialog?.close();
</script>

<dialog class="modal modal-bottom lg:modal-middle" bind:this={dialog} on:close={close}>
	<div class="modal-box flex flex-col w-full" class:!max-w-full={fullWidth}>
		<div class="mb-6">
			<div class="flex gap-x-2 align-middle">
				<slot name="icon" />
				<h3 class="flex flex-row flex-nowrap text-2xl flex-grow">
					{#if title !== undefined}
						<span>{title}</span>
					{/if}
					<slot name="title" />
				</h3>
				<button title="Close Modal" class="btn btn-sm btn-circle btn-error" on:click={close}>
					<XMark class="w-5 h-5" />
				</button>
			</div>
		</div>

		<slot name="header" />

		{#if isOverflow}
			<div class="divider p-0 m-0 h-0"></div>
		{/if}

		<div class="overflow-y-auto p-4" bind:this={content} bind:offsetHeight>
			<slot name="content" />
		</div>

		{#if isOverflow}
			<div class="divider p-0 m-0 h-0"></div>
		{/if}

		<div class="modal-action">
			<slot name="action" />
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button on:click={close}>close</button>
	</form>
</dialog>
