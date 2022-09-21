<script lang="ts">
	import type Candidate from '$lib/types/Candidate';

	export let open = false;
	export let candidate: Candidate;
	export let onConfirm: () => void;
	export let onClose: () => void;
</script>

<input type="checkbox" class="modal-toggle" checked={open} />
<label class="modal cursor-pointer" on:click={onClose}>
	<label class="modal-box relative">
		<h3 class="font-bold text-lg">{candidate.name}</h3>
		<div class="modal-action">
			<label for="my-modal" class="btn" on:click={onClose}> Close </label>
			<label for="my-modal" class="btn" on:click={onConfirm}> Confirm </label>
		</div>
	</label>
</label>
