<script lang="ts">
	import { LogoStore } from '$lib/stores/Logo';
	import RedEaglePolitics from '$lib/assets/logos/rep.png';
	import LetsTalkElections from '$lib/assets/logos/lte.png';

	const logos = [
		{ name: 'Lets Talk Elections', src: LetsTalkElections },
		{ name: 'Red Eagle Politics', src: RedEaglePolitics }
	];

	function onClick(name: string) {
		const logo = logos.find((logo) => logo.name === name);
		if (logo !== undefined) {
			$LogoStore = logo.src;
		}
	}
</script>

<div class="flex flex-row gap-3 flex-wrap justify-center">
	{#each logos as logo}
		<button class="btn btn-md" onclick={() => onClick(logo.name)}>{logo.name}</button>
	{/each}
</div>
