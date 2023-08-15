<script lang="ts">
	import { ThemeModalStore } from '$lib/stores/Modals';
	import ThemeGrid from './ThemeGrid.svelte';
	import ModalBase from '../ModalBase.svelte';
</script>

<ModalBase title="Change Theme" store={ThemeModalStore}>
	<div slot="content">
		<ThemeGrid />
	</div>
</ModalBase>
