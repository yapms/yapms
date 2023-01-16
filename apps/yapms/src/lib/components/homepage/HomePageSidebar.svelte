<script lang="ts">
	import Fa from 'svelte-fa';
	import { faDiscord, faGithub, faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons';

	import { onMount } from "svelte";
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import SideBarUpdate from './SideBarUpdate.svelte';
	import type { Record } from 'pocketbase';

	let updates:Record[] = [];

	onMount(async () => {
		//Request the last 10 update records from pocketbase.
		$PocketBaseStore.collection('updates').getList(1, 10, {sort: '-created'})
		.then(data => {
			updates = data.items
		}).catch(error => {
			console.log(`Failed to fetch updates:\n${error}`);
		});
	});
</script>

<div class="lg:w-1/5 pl-5 hidden md:flex flex-col h-full justify-between">
	<div class="overflow-y-auto">
		<div class="divider">Updates</div>
		{#each updates as update}
			<SideBarUpdate title={update.title} description={update.description}></SideBarUpdate>
		{/each}
	</div>
	<div class="mb-4">
		<div class="divider">Social Links</div>
		<div class="grid grid-cols-2 gap-2">
			<a class="btn btn-sm w-full flex-nowrap gap-2" href="https://www.reddit.com/r/YAPms/">
				<Fa icon={faReddit}/>
				<span>Reddit</span>
			</a>
			<a class="btn btn-sm w-full flex-nowrap gap-2" href="https://discord.gg/Rq5bk3eDwm">
				<Fa icon={faDiscord}/>
				<span>Discord</span>
			</a>
			<a class="btn btn-sm w-full flex-nowrap gap-2" href="https://twitter.com/yapmsofficial">
				<Fa icon={faTwitter}/>
				<span>Twitter</span>
			</a>
			<a class="btn btn-sm w-full flex-nowrap gap-2" href="https://github.com/yapms">
				<Fa icon={faGithub}/>
				<span>GitHub</span>
			</a>
		</div>
	</div>
</div>
