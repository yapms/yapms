<script lang="ts">
	import Fa from 'svelte-fa';
	import { faDiscord, faGithub, faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons';

	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import SideBarUpdate from './SideBarUpdate.svelte';

	let updates = $PocketBaseStore.collection('updates').getList(1, 10, { sort: '-created' });
</script>

<div class="lg:w-1/5 pl-5 hidden md:flex flex-col h-full justify-between">
	<div class="overflow-y-auto">
		<div class="divider">Updates</div>
		<div class="flex flex-col gap-y-3 items-stretch">
			{#await updates}
				<span class="loading loading-ring loading-lg text-primary self-center"></span>
			{:then updates}
				{#each updates.items as update}
					<SideBarUpdate title={update.title} description={update.description} />
				{/each}
			{/await}
		</div>
	</div>
	<div class="mb-4">
		<div class="divider">Social Links</div>
		<div class="grid grid-cols-2 gap-2">
			<a class="btn btn-sm w-full flex-nowrap gap-2" href="https://www.reddit.com/r/YAPms/">
				<Fa icon={faReddit} />
				<span>Reddit</span>
			</a>
			<a class="btn btn-sm w-full flex-nowrap gap-2" href="https://discord.gg/Rq5bk3eDwm">
				<Fa icon={faDiscord} />
				<span>Discord</span>
			</a>
			<a class="btn btn-sm w-full flex-nowrap gap-2" href="https://twitter.com/yapmsofficial">
				<Fa icon={faTwitter} />
				<span>Twitter</span>
			</a>
			<a class="btn btn-sm w-full flex-nowrap gap-2" href="https://github.com/yapms">
				<Fa icon={faGithub} />
				<span>GitHub</span>
			</a>
		</div>
	</div>
</div>
