<script lang="ts">
	import VideoCameraSlash from '$lib/icons/VideoCameraSlash.svelte';
	import { PresentationModeStore } from '$lib/stores/PresentationMode';

	function togglePresentationMode() {
		$PresentationModeStore.enabled = !$PresentationModeStore.enabled;
	}
</script>

<button
	class="btn btn-sm btn-error w-min m-1 absolute right-0 float-right z-10"
	onclick={togglePresentationMode}
>
	<VideoCameraSlash class="w-6 h-6" />
</button>
