<script lang="ts">
	import { LoadingErrorModalStore } from '$lib/stores/Modals';
	import ModalBase from '../ModalBase.svelte';
</script>

<ModalBase title="Loading Error" store={LoadingErrorModalStore}>
	<div slot="content">
		<p>There seems to have been an issue loading your map. Sorry about that!</p>
	</div>
</ModalBase>
