<script>
	import { PocketBaseStore } from '$lib/stores/PocketBase';

	let loading = false;
	let registerError = false;
	let registerSuccess = true;

	let email = '';
	let username = '';
	let password = '';
	let passwordConfirm = '';

	async function register() {
		registerError = false;
		loading = true;
		try {
			await $PocketBaseStore.collection('users').create({
				email,
				username,
				password,
				passwordConfirm
			});
			await $PocketBaseStore.collection('users').requestVerification(email);
			registerSuccess = true;
			email = '';
			username = '';
			password = '';
			passwordConfirm = '';
		} catch (error) {
			registerError = true;
		} finally {
			loading = false;
		}
	}

	function clearError() {
		registerError = false;
	}
</script>

{#if registerError}
	<span class="text-error"> There was an error registering, please try again. </span>
{/if}

{#if registerSuccess}
	<span class="text-success">
		You have successfully registered, please check your email to verify your account.
	</span>
{/if}

<form on:submit={register} on:input={clearError} class="flex flex-col gap-4 p-2">
	<input
		type="text"
		class="input input-bordered"
		class:input-error={registerError}
		disabled={loading}
		bind:value={email}
		placeholder="Email"
	/>
	<input
		type="text"
		class="input input-bordered"
		class:input-error={registerError}
		bind:value={username}
		disabled={loading}
		placeholder="Username"
	/>
	<input
		type="password"
		class="input input-bordered"
		class:input-error={registerError}
		bind:value={password}
		disabled={loading}
		placeholder="Password"
	/>
	<input
		type="password"
		class="input input-bordered"
		class:input-error={registerError}
		bind:value={passwordConfirm}
		disabled={loading}
		placeholder="Confirm Password"
	/>
	<button class="btn btn-md btn-success" class:loading type="submit">Register</button>
</form>
