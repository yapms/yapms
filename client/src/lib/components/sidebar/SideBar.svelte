<script lang="ts">
	export let open = true;

	import Fa from 'svelte-fa';
	import { faLandmarkDome } from '@fortawesome/free-solid-svg-icons';
	import { faDiscord, faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons';

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

{#if open}
	<div class="border-l-2 basis-3/12 hidden md:inline" transition:slideX={{ duration: 300 }}>
		<div class="flex flex-wrap justify-center gap-2 p-2">
			<button type="button" class="btn btn-sm gap-2">
				<Fa icon={faDiscord} />
				<div>Discord</div>
			</button>
			<button type="button" class="btn btn-sm gap-2">
				<Fa icon={faReddit} />
				Reddit
			</button>
			<button type="button" class="btn btn-sm gap-2">
				<Fa icon={faTwitter} />
				Twitter
			</button>
			<button type="button" class="btn btn-sm gap-2">
				<Fa icon={faLandmarkDome} />
				Mock Gov
			</button>
		</div>
		<h1 class="text-xl text-center font-bold">USA 2024 Presidential Election</h1>
		<div class="divider">Shortcuts</div>
	</div>
{/if}
