<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import ThemeButton from './ThemeButton.svelte';

	onMount(() => {
		themeChange(false);
	});
</script>

<div class="flex flex-row gap-3 flex-wrap justify-center">
	<ThemeButton
		title="Light"
		theme="light"
		margins={[
			'oklch(0.45 0.24 277.023)',
			'oklch(0.65 0.241 354.308)',
			'oklch(0.77 0.152 181.912)',
			'oklch(0.14 0.005 285.823)'
		]}
	/>
	<ThemeButton
		title="Dim"
		theme="dim"
		margins={[
			'oklch(0.86133 0.141 139.549)',
			'oklch(0.73375 0.165 35.353)',
			'oklch(0.74229 0.133 311.379)',
			'oklch(0.24731 0.02 264.094)'
		]}
	/>
	<ThemeButton
		title="CMYK"
		theme="cmyk"
		margins={[
			'oklch(0.71772 0.133 239.443)',
			'oklch(0.64476 0.202 359.339)',
			'oklch(0.94228 0.189 105.306)',
			'oklch(0.21778 0 0)'
		]}
	/>
	<ThemeButton
		title="Dark"
		theme="dark"
		margins={[
			'oklch(0.58 0.233 277.117)',
			'oklch(0.65 0.241 354.308)',
			'oklch(0.77 0.152 181.912)',
			'oklch(0.14 0.005 285.823)'
		]}
	/>
	<ThemeButton
		title="Nord"
		theme="nord"
		margins={[
			'oklch(0.59435 0.077 254.027)',
			'oklch(0.69651 0.059 248.687)',
			'oklch(0.77464 0.062 217.469)',
			'oklch(0.45229 0.035 264.131)'
		]}
	/>
	<ThemeButton
		title="Black"
		theme="black"
		margins={['oklch(0.35 0 0)', 'oklch(0.35 0 0)', 'oklch(0.35 0 0)', 'oklch(0.35 0 0)']}
	/>
</div>
