<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import ThemeButton from './ThemeButton.svelte';

	onMount(() => {
		themeChange(false);
	});
</script>

<div class="flex flex-row gap-3 flex-wrap justify-center">
	<ThemeButton title="Light" theme="light" margins={['#ffffff', '#570df8', '#f000b8', '#37cdbe']} />
	<ThemeButton title="Dark" theme="dark" margins={['#2A303C', '#661AE6', '#D926AA', '#1FB2A5']} />
	<ThemeButton
		title="Cupcake"
		theme="cupcake"
		margins={['#faf7f5', '#65c3c8', '#ef9fbc', '#eeaf3a']}
	/>
	<ThemeButton
		title="Dracula"
		theme="dracula"
		margins={['#272935', '#ff79c6', '#bd93f9', '#ffb86c']}
	/>
	<ThemeButton title="Lofi" theme="lofi" margins={['#ffffff', '#0D0D0D', '#1A1919', '#262626']} />
	<ThemeButton title="Night" theme="night" margins={['#0F172A', '#38bdf8', '#818CF8', '#F471B5']} />
</div>
