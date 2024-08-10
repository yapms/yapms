<script lang="ts">
	import { ToolsModalStore } from '$lib/stores/Modals';
	import type { Writable } from 'svelte/store';

	export let text: string;
	export let store: Writable<{ open: boolean }>;

	function openToolModal() {
		$store.open = true;
		$ToolsModalStore.open = false;
	}
</script>

<button class="btn btn-primary" on:click={openToolModal}>
	{text}
</button>
