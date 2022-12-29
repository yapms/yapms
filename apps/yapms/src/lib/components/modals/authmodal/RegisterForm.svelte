<script>
  import { PocketBaseStore } from '$lib/stores/PocketBase';
  
  let loading = false;
  let postError = false;

  let email = "";
  let username = "";
  let password = "";
  let passwordConfirm = "";

  async function register() {
    postError = false;
    loading = true;
    try {
      await $PocketBaseStore.collection('users').create({
        email,
        username,
        password,
        passwordConfirm
      });
      await $PocketBaseStore.collection('users').requestVerification(email);
    } catch (error) {
      postError = true;
    } finally {
      loading = false;
    }
  }

</script>

<form on:submit={register} class="flex flex-col gap-2">
  {#if !loading}
    {#if postError}
      <p class="bg-error">There was an error registering.</p>
    {/if}
    <input bind:value={email} type="text" placeholder="Email" />
    <input bind:value={username} type="text" placeholder="Username" />
    <input bind:value={password} type="password" placeholder="Password" />
    <input bind:value={passwordConfirm} type="password" placeholder="Confirm Password" />
    <input class="btn btn-sm btn-success" type="submit" value="Register" />
  {:else}
    <p>Registering...</p>
  {/if}
</form>