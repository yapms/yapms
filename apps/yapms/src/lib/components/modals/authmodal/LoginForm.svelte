<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { PUBLIC_REDIRECT_URI } from '$env/static/public';
	import { page } from '$app/stores';

	const authMethods = $PocketBaseStore.collection('users').listAuthMethods();

	function authenticate(authUrl: string, provider: string, codeVerifier: string, state: string) {
		localStorage.setItem('codeVerifier', codeVerifier);
		localStorage.setItem('state', state);
		localStorage.setItem('provider', provider);
		localStorage.setItem('redirect', $page.url.href);
		const url = new URL(authUrl + PUBLIC_REDIRECT_URI);
		window.location.href = url.href;
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
					authenticate(method.authUrl, method.name, method.codeVerifier, method.state);
				}}
			>
				Login With {method.name}
			</button>
		{/each}
	</div>
{/await}
