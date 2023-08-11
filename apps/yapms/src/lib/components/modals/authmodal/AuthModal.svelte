<script lang="ts">
	import { LoginModalStore } from '$lib/stores/Modals';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import LoginForm from './LoginForm.svelte';
	import AccountForm from './AccountForm.svelte';
	import ModalBase from '../ModalBase.svelte';
</script>

<ModalBase title="Login" store={LoginModalStore}>
	<div slot="content">
		<div class="flex flex-row justify-around gap-1">
			{#if $PocketBaseStore.authStore.isValid}
				<AccountForm />
			{:else}
				<LoginForm />
			{/if}
		</div>
	</div>
</ModalBase>
