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
			<button type="button" class="btn btn-sm w-[45%]">
				<Fa icon={faReddit} class="pr-1"/>
				<a href="https://www.reddit.com/r/YAPms/">Reddit</a>
			</button>
			<button type="button" class="btn btn-sm w-[45%]">
				<Fa icon={faDiscord} class="pr-1"/>
				<a href="https://discord.gg/Rq5bk3eDwm">Discord</a>
			</button>
			<button type="button" class="btn btn-sm w-[45%]">
				<Fa icon={faTwitter} class="pr-1"/>
				<a href="https://twitter.com/yapmsofficial">Twitter</a>
			</button>
			<button type="button" class="btn btn-sm w-[45%]">
				<Fa icon={faGithub} class="pr-1"/>
				<a href="https://github.com/yapms">GitHub</a>
			</button>
		</div>
	</div>
</div>
