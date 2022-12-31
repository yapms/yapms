<script lang="ts">
	import { PocketBaseStore } from '$lib/stores/PocketBase';

	let loading = false;

	let username: string;
	let password: string;

	let loginFailed = false;

	async function login() {
		loading = true;
		try {
			await $PocketBaseStore.collection('users').authWithPassword(username, password);
			PocketBaseStore.set($PocketBaseStore);
		} catch (error) {
			loginFailed = true;
		}
		loading = false;
	}

	function clearError() {
		loginFailed = false;
	}
</script>

{#if loginFailed}
	<span class="text-error">There was an error logging in, please try again.</span>
{/if}

<form class="flex flex-col gap-4 p-2" on:submit={login} on:input={clearError}>
	<input
		type="text"
		class="input input-bordered"
		class:input-error={loginFailed}
		bind:value={username}
		placeholder="Email or Username"
	/>
	<input
		type="password"
		class="input input-bordered"
		class:input-error={loginFailed}
		bind:value={password}
		placeholder="Password"
	/>
	<button type="submit" class="btn btn-md btn-success" class:loading>Login</button>
</form>
