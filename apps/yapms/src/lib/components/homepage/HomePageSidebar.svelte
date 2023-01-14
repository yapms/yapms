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
