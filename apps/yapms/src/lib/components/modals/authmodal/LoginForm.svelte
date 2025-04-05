<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';

	const authMethods = $PocketBaseStore.collection('users').listAuthMethods();

	async function authenticate(provider: string) {
		await $PocketBaseStore.collection('users').authWithOAuth2({
			provider
		});
		PocketBaseStore.set($PocketBaseStore);
	}
</script>

{#await authMethods}
	<span class="loading loading-ring"></span>
{:then authMethods}
	<p class="mb-2 text-center">Please log in to YAPms to save your maps</p>
	{#if authMethods.oauth2.providers.length !== 0}
		<div class="flex flex-row flex-wrap gap-2 justify-evenly items-center">
			{#each authMethods.oauth2.providers as method}
				<button
					class="btn btn-primary capitalize"
					on:click={async () => {
						await authenticate(method.name);
					}}
				>
					Login With {method.name}
				</button>
			{/each}
		</div>
	{:else}
		<p class="text-center">
			Login functionality is currently <span class="text-error">disabled</span>
		</p>
	{/if}
{/await}
