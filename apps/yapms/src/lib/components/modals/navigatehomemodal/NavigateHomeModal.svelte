<script>
	import { goto } from '$app/navigation';
	import { NavigateHomeModalStore } from '$lib/stores/Modals';
	import ModalBase from '../ModalBase.svelte';

	function confirm() {
		$NavigateHomeModalStore.open = false;
		goto('/');
	}
</script>

<ModalBase title="Navigate Home" store={NavigateHomeModalStore}>
	<div slot="content">
		<p>Navigating home will result in all of your progress being cleared. Are you sure?</p>
	</div>

	<div slot="action">
		<button class="btn btn-error" on:click={confirm}>Confirm</button>
	</div>
</ModalBase>
