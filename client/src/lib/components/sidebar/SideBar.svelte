<script lang="ts">
	export let open = true;
	export let path: string;

	import titles from '$lib/assets/other/Titles.json';

	const title = titles.find((obj) => {
		return obj.key === path;
	});

	import Fa from 'svelte-fa';
	import { faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons';

	import type { TransitionConfig } from 'svelte/transition';

	function slideX(node: Element, options: { duration: number }): TransitionConfig {
		const style = getComputedStyle(node);
		const width = parseFloat(style.width);

		return {
			duration: options.duration,
			css: (t, u) => `margin-right: ${u * width * -1}px;`
		};
	}
</script>

<svelte:head>
	<title>YAPms {title ? ' - ' + title.title : ''}</title>
</svelte:head>

{#if open}
	<div class="divider divider-horizontal ml-0 w-0" />
	<div class="basis-3/12 hidden md:inline" transition:slideX={{ duration: 300 }}>
		<div class="flex flex-wrap justify-center gap-2 p-2">
			<button type="button" class="btn btn-sm gap-2">
				<Fa icon={faReddit} />
				Reddit
			</button>
			<button type="button" class="btn btn-sm gap-2">
				<Fa icon={faTwitter} />
				Twitter
			</button>
		</div>
		<h1 class="text-xl text-center font-bold">{path}</h1>
		<div class="divider">Shortcuts</div>
	</div>
{/if}
