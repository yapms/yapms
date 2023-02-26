<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { PUBLIC_REDIRECT_URI } from '$env/static/public';

	let displayError: 'none' | 'state' | 'auth' = 'none';
	let redirect = '';

	onMount(async () => {
		const searchParams = $page.url.searchParams;
		const code = searchParams.get('code') ?? '';
		const codeVerifier = localStorage.getItem('codeVerifier') ?? '';
		const state = localStorage.getItem('state') ?? '';
		const provider = localStorage.getItem('provider') ?? '';
		redirect = localStorage.getItem('redirect') ?? '/';

		localStorage.removeItem('codeVerifier');
		localStorage.removeItem('state');
		localStorage.removeItem('provider');
		localStorage.removeItem('redirect');

		if (state !== searchParams.get('state')) {
			displayError = 'state';
			return;
		}

		try {
			await $PocketBaseStore
				.collection('users')
				.authWithOAuth2(provider, code, codeVerifier, PUBLIC_REDIRECT_URI, {
					emailVisibility: false
				});
			window.location.href = redirect;
		} catch (error) {
			displayError = 'auth';
		}
	});
</script>

<div>
	<h1>Redirecting...</h1>
	{#if displayError === 'state'}
		<p>State mismatch</p>
	{/if}
	{#if displayError === 'auth'}
		<p>Authentication failed</p>
	{/if}
	{#if displayError !== 'none'}
		<button class="btn btn-error" on:click={() => (window.location.href = redirect)}
			>Continue</button
		>
	{/if}
</div>
