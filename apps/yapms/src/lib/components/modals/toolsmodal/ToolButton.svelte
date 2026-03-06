<script lang="ts">
	import { ToolsModalStore } from '$lib/stores/Modals';

	export let text: string;
	export let callback: () => void;
</script>

<button
	class="btn btn-primary"
	on:click={() => {
		callback();
		$ToolsModalStore.open = false;
	}}
>
	{text}
</button>
