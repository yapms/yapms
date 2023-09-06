<script lang="ts">
	import XMark from '$lib/icons/XMark.svelte';
	import type { Writable } from 'svelte/store';

	export let title: string;

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
	let offsetHeight: number | undefined;

	$: isOverflow = offsetHeight && offsetHeight < (content?.scrollHeight ?? 0);
</script>

<input type="checkbox" class="modal-toggle" checked={$store?.open ?? false} />

<dialog class="modal modal-bottom lg:modal-middle" on:close={close}>
	<div class="modal-box flex flex-col w-full">
		<div class="mb-6">
			<div class="flex gap-x-2 align-middle">
				<slot name="icon" />
				<h3 class="text-2xl flex-grow">
					{title}
				</h3>
				<button class="btn btn-sm btn-circle btn-error" on:click={close}>
					<XMark class="w-5 h-5" />
				</button>
			</div>
		</div>

		<slot name="header" />

		{#if isOverflow}
			<div class="divider p-0 m-0 h-0" />
		{/if}

		<div class="overflow-y-auto p-4" bind:this={content} bind:offsetHeight>
			<slot name="content" />
		</div>

		{#if isOverflow}
			<div class="divider p-0 m-0 h-0" />
		{/if}

		<div class="modal-action">
			<slot name="action" />
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button on:click={close}>close</button>
	</form>
</dialog>
