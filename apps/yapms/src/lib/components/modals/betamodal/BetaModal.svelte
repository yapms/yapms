<script lang="ts">
	import ModalTitle from '$lib/components/modalutilities/ModalTitle.svelte';
	import { BetaModalStore } from '$lib/stores/Modals';
	import { dev } from '$app/environment';
	import ExclamationCircle from '$lib/icons/ExclamationCircle.svelte';
	import Fa from 'svelte-fa';
	import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
	import ModalBase from '../ModalBase.svelte';

	function close() {
		BetaModalStore.set({
			...$BetaModalStore,
			open: false
		});
	}
</script>

<ModalBase title="YAPms2 is in Beta" open={!dev && $BetaModalStore.open}>
	<div slot="icon"><ExclamationCircle class="w-9 h-9 text-yellow-500" /></div>
	<div slot="content">
		<div class="flex flex-col gap-y-2">
			<p>
				YAPms2 is currently in beta and is unfinished with a limited map catalog and incomplete user
				interface.
			</p>
			<p>
				You can report bugs, suggest features, and contribute to development on our <a
					class="link link-primary"
					href="https://github.com/yapms/yapms">GitHub</a
				>
				or in our <a class="link link-primary" href="https://discord.gg/Rq5bk3eDwm">Discord</a>.
				Thank you.
			</p>
		</div>
	</div>
	<div slot="action">
		<a class="btn gap-2" href="https://github.com/yapms/yapms">
			<Fa icon={faGithub} />
			<span>GitHub</span>
		</a>
		<a class="btn gap-2" href="https://discord.gg/Rq5bk3eDwm">
			<Fa icon={faDiscord} />
			<span>Discord</span>
		</a>
		<button class="btn btn-primary" on:click={close}> Okay </button>
	</div>
</ModalBase>
