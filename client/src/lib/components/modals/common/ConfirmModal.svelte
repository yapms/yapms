<script lang="ts">
	export let open = false;
	export let title: string;
	export let message: string;
	export let onConfirm: () => void;
	export let onClose: () => void;

	import { fade } from 'svelte/transition';
</script>

{#if open}
	<input type="checkbox" class="modal-toggle" checked={open} />
	<div class="modal" transition:fade={{ duration: 100 }}>
		<div class="modal-box">
			<h3 class="font-bold text-lg">{title}</h3>
			<p>{message}</p>
			<div class="modal-action">
				<label for="my-modal" class="btn" on:click={onClose}> Close </label>
				<label for="my-modal" class="btn" on:click={onConfirm}> Confirm </label>
			</div>
		</div>
	</div>
{/if}
