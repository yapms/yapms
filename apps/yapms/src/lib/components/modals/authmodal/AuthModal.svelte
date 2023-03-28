<script lang="ts">
	import { LoginModalStore } from '$lib/stores/Modals';
	import ModalTitle from '../../modalutilities/ModalTitle.svelte';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import LoginForm from './LoginForm.svelte';
	import AccountForm from './AccountForm.svelte';

	function close() {
		LoginModalStore.set({
			...$LoginModalStore,
			open: false
		});
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$LoginModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<ModalTitle title="Login" />
		<div class="flex flex-row justify-around gap-1">
			{#if $PocketBaseStore.authStore.isValid}
				<AccountForm />
			{:else}
				<LoginForm />
			{/if}
		</div>
		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}>No</button>
		</div>
	</div>
</div>
