<script lang="ts">
	import { RenameSavedMapModalStore } from '$lib/stores/Modals';
	import ModalBase from '../ModalBase.svelte';

	let nameInput: HTMLInputElement;
	let nameBind = $state('');

	$effect(() => {
		if ($RenameSavedMapModalStore.open) {
			setInputs();
			focusInput();
		}
	});

	function focusInput() {
		if (nameInput) {
			nameInput.focus();
		}
	}

	function setInputs() {
		nameBind = $RenameSavedMapModalStore.name;
	}

	function confirm() {
		$RenameSavedMapModalStore.onRename(nameBind);
		$RenameSavedMapModalStore.open = false;
	}
</script>

<ModalBase title="Rename {$RenameSavedMapModalStore.name}" store={RenameSavedMapModalStore}>
	<div slot="content">
		<form onsubmit={confirm}>
			<fieldset class="fieldset">
				<legend class="fieldset-legend">Name</legend>
				<input class="input input-bordered w-full" bind:value={nameBind} bind:this={nameInput} />

				<!-- Hidden button so you can hit enter to submit form -->
				<button type="submit" hidden>Submit</button>
			</fieldset>
		</form>
	</div>
	<div slot="action">
		<button class="btn btn-success" onclick={confirm}>Confirm</button>
	</div>
</ModalBase>
