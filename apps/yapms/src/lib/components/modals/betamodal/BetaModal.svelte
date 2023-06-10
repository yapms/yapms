<script lang="ts">
	import ModalTitle from '$lib/components/modalutilities/ModalTitle.svelte';
	import { BetaModalStore } from '$lib/stores/Modals';
	import { dev } from '$app/environment';
	import ExclamationCircle from '$lib/icons/ExclamationCircle.svelte';
	import Fa from 'svelte-fa';
	import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

	function close() {
		BetaModalStore.set({
			...$BetaModalStore,
			open: false
		});
	}
</script>

<input type="checkbox" class="modal-toggle" checked={!dev && $BetaModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<div class="flex gap-x-2 items-start">
			<ExclamationCircle class="w-9 h-9 text-yellow-500" />
			<ModalTitle title="YAPms2 is in Beta" />
		</div>
		<p>
			YAPms2 is currently in beta and is unfinished with a limited map catalog and incomplete user
			interface.
		</p>
		<p />
		<br />
		<p>
			You can report bugs, suggest features, and contribute to development on our <a
				class="text-blue-500 underline"
				href="https://github.com/yapms/yapms">GitHub</a
			>
			or in our <a class="text-blue-500 underline" href="https://discord.gg/Rq5bk3eDwm">Discord</a>.
			Thank you.
		</p>
		<div class="modal-action">
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
	</div>
</div>
