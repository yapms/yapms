<script lang="ts">
	import { beforeUpdate, afterUpdate } from 'svelte';
	afterUpdate(() => {
		window.googletag.cmd.push(() => {
			window.googletag
				.defineSlot(
					'/21838847269/yapms-sidebar',
					[
						[250, 250],
						[200, 200]
					],
					'div-gpt-ad-1698618618626-0'
				)
				.addService(window.googletag.pubads());
			window.googletag.pubads().collapseEmptyDivs();
			window.googletag.enableServices();
		});

		window.googletag.cmd.push(() => {
			window.googletag.display('div-gpt-ad-1698618618626-0');
		});
	});

	beforeUpdate(() => {
		window.googletag.cmd.push(() => {
			window.googletag.destroySlots();
		});
	});
</script>

<!-- /21838847269/yapms-sidebar -->
<div
	id="div-gpt-ad-1698618618626-0"
	style="min-width: 200px; min-height: 200px;"
	class="flex justify-center"
/>
