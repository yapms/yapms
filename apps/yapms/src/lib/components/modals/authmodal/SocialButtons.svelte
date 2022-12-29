<script lang="ts">
  import { PocketBaseStore } from "$lib/stores/PocketBase";
	import { PUBLIC_REDIRECT_URI } from "$env/static/public";

  const authMethods = $PocketBaseStore.collection('users').listAuthMethods();
  
  function authenticate(
    authUrl: string,
    provider: string,
    codeVerifier: string,
    state: string
  ) {
    localStorage.setItem('codeVerifier', codeVerifier);
    localStorage.setItem('state', state);
    localStorage.setItem('provider', provider);
    window.location.href = authUrl + PUBLIC_REDIRECT_URI;
  }
</script>

{#await authMethods}
  <div>Loading...</div>
{:then authMethods}
  <div class="flex flex-row flex-wrap gap-3 justify-center items-center">
  {#each authMethods.authProviders as method}
    <button class="btn btn-sm btn-wide btn-accent" on:click={() => {
      authenticate(
        method.authUrl, method.name,
        method.codeVerifier, method.state
      );
    }}>
      Login With {method.name}
    </button>
  {/each}
  </div>
{/await}