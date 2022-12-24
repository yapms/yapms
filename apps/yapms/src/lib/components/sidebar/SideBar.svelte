<script lang="ts">
	import { page } from '$app/stores';

	import Fa from 'svelte-fa';
	import { faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons';

	import type { TransitionConfig } from 'svelte/transition';

	import titles from '$lib/assets/other/Titles.json';

	function slideX(node: Element, options: { duration: number }): TransitionConfig {
		const style = getComputedStyle(node);
		const width = parseFloat(style.width);

		return {
			duration: options.duration,
			css: (_t, u) => `margin-right: ${u * width * -1}px;`
		};
	}

	/**
	 * The title for this page as defined by page path in lib/assets/other/Titles.json.
	 * Updates when page.url.pathname changes. "YAPms" if title not defined.
	 */
	$: title = titles.find((elem) => elem.path === $page.url.pathname)?.title ?? 'YAPms';
</script>

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
	<h1 class="text-xl text-center font-bold">{title}</h1>
	<div class="divider">Shortcuts</div>
</div>
