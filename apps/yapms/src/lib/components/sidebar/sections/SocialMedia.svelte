<script>
	import { faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';
</script>

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
