<script lang="ts">
  import { PocketBaseStore } from '$lib/stores/PocketBase';
  let username: string;
  let password: string;

  async function login() {
    await $PocketBaseStore.collection('users').authWithPassword(
      username,
      password
    );
    PocketBaseStore.set($PocketBaseStore);
  }
</script>

<form
  class="flex flex-col gap-2 pb-4"
  on:submit={login}
>
  <input type="text" bind:value={username} placeholder="Username" />
  <input type="password" bind:value={password} placeholder="Password" />
  <input class="btn btn-sm btn-success" type="submit" value="Login" />
</form>