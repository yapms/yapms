<script lang="ts">
	import Fa from 'svelte-fa';
	import { faDiscord, faGithub, faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons';
</script>

<div class="lg:w-1/5 pl-5 hidden md:flex flex-col h-full justify-between">
	<div>
		<div class="divider">Updates</div>
		<p>This will eventually be updated by a server</p>
	</div>
	<div class="mb-4">
		<div class="divider">Social Links</div>
		<div class="flex flex-wrap justify-evenly gap-2">
			<a class="w-[45%]" href="https://www.reddit.com/r/YAPms/">
				<button type="button" class="btn btn-sm w-full flex-nowrap">
					<Fa icon={faReddit} class="pr-1"/>
					Reddit
				</button>
			</a>
			<a class="w-[45%]" href="https://discord.gg/Rq5bk3eDwm">
				<button type="button" class="btn btn-sm w-full flex-nowrap">
					<Fa icon={faDiscord} class="pr-1"/>
					Discord
				</button>
			</a>
			<a class="w-[45%]" href="https://twitter.com/yapmsofficial">
				<button type="button" class="btn btn-sm w-full flex-nowrap">
					<Fa icon={faTwitter} class="pr-1"/>
					Twitter
				</button>
			</a>
			<a class="w-[45%]" href="https://github.com/yapms">
				<button type="button" class="btn btn-sm w-full flex-nowrap">
					<Fa icon={faGithub} class="pr-1"/>
					Github
				</button>
			</a>
		</div>
	</div>
</div>
