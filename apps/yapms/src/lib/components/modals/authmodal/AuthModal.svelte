<script lang="ts">
	import { AuthModalStore } from '$lib/stores/Modals';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { PUBLIC_PRIVACY_POLICY_URI } from '$env/static/public';
	import LoginForm from './LoginForm.svelte';
	import AccountForm from './AccountForm.svelte';
	import ModalBase from '../ModalBase.svelte';
</script>

<ModalBase
	title={$PocketBaseStore.authStore.isValid ? 'Your Account' : 'Login'}
	store={AuthModalStore}
>
	<div slot="content">
		<div class="flex flex-col justify-around gap-2">
			{#if $PocketBaseStore.authStore.isValid}
				<AccountForm />
			{:else}
				<LoginForm />
			{/if}
		</div>
	</div>

	<div slot="action">
		<span>
			By using our services, you agree to our
			<a href={PUBLIC_PRIVACY_POLICY_URI} class="link link-info">privacy policy</a>
		</span>
	</div>
</ModalBase>
