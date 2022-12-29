<script lang="ts">
  import { PocketBaseStore } from "$lib/stores/PocketBase";
  import { page } from '$app/stores';
	import { onMount } from "svelte";
	import { PUBLIC_REDIRECT_URI } from "$env/static/public";

  onMount(async () => {
    const searchParams = $page.url.searchParams;
    const code = searchParams.get('code') ?? '';
    const codeVerifier = localStorage.getItem('codeVerifier') ?? '';
    const state = localStorage.getItem('state') ?? '';
    const provider = localStorage.getItem('provider') ?? '';

    console.log(code);
    console.log(codeVerifier);
    console.log(state);
    console.log(provider);

    if (state !== searchParams.get('state')) {
      throw new Error("State parameter mismatch");
    }

    $PocketBaseStore.collection('users').authWithOAuth2(
      provider,
      code,
      codeVerifier,
      PUBLIC_REDIRECT_URI,
      {
        emailVisibility: false
      }
    ).then((res) => {
      console.log(res);
      window.location.href = "/";
    }).catch((err) => {
      console.log("ERROR");
      console.log(err);
    });
  });
</script>

<div>
  AUTHENTICATING DATA
</div>