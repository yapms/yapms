<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	const themes = [
		//Hex codes can be found in node_modules/daisyui/src/colors/themes
		//name: id for theme, margins ['base-100','primary','secondary','accent']
		{ name: 'light', margins: ['#ffffff', '#570df8', '#f000b8', '#37cdbe'] },
		{ name: 'dark', margins: ['#2A303C', '#661AE6', '#D926AA', '#1FB2A5'] },
		{ name: 'cupcake', margins: ['#faf7f5', '#65c3c8', '#ef9fbc', '#eeaf3a'] },
		{ name: 'dracula', margins: ['#0F172A', '#38bdf8', '#818CF8', '#F471B5'] },
		{ name: 'lofi', margins: ['#ffffff', '#0D0D0D', '#1A1919', '#262626'] },
		{ name: 'night', margins: ['#0F172A', '#38bdf8', '#818CF8', '#F471B5'] }
	];

	onMount(() => {
		themeChange(false);
	});
</script>

<div class="flex flex-row gap-3 flex-wrap justify-center">
	{#each themes as theme}
		<button class="btn btn-lg" data-set-theme={theme.name} data-act-class="ACTIVECLASS">
			<div class="flex flex-col gap-2">
				<h3>{theme.name}</h3>
				<div class="flex flex-row gap-2">
					{#each theme.margins as margin}
						<div
							class="outline outline-1 outline-white w-4 h-4 rounded-full"
							style:background-color={margin}
						/>
					{/each}
				</div>
			</div>
		</button>
	{/each}
</div>
