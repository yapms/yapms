<script lang="ts">
	import { LoginModalStore } from '$lib/stores/Modals';
	import { PocketBaseStore } from '$lib/stores/PocketBase';

	const authMethods = $PocketBaseStore.collection('users').listAuthMethods();

	async function authenticate(provider: string) {
		await $PocketBaseStore.collection('users').authWithOAuth2({
			provider: provider
		});
		PocketBaseStore.set($PocketBaseStore);
	}
</script>

{#await authMethods}
	<div>Loading...</div>
{:then authMethods}
	<div class="grid grid-cols-2 gap-3 p-2 items-center">
		{#each authMethods.authProviders as method}
			<button
				class="btn btn-accent"
				on:click={() => {
					authenticate(method.name);
				}}
			>
				Login With {method.name}
			</button>
		{/each}
	</div>
{/await}
