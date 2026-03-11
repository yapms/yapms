<script lang="ts">
	import { ToolsModalStore } from '$lib/stores/Modals';

	const { text, callback }: { text: string; callback: () => void } = $props();
</script>

<button
	class="btn btn-primary"
	onclick={() => {
		callback();
		$ToolsModalStore.open = false;
	}}
>
	{text}
</button>
