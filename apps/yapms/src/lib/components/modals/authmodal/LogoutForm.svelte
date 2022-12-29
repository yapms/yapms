<script>
  import { PocketBaseStore } from "$lib/stores/PocketBase";
</script>

<div class="flex flex-col gap-2">
  <h3>Welcome {$PocketBaseStore.authStore.model?.email}</h3>
  <button class="btn btn-sm btn-error" on:click={() => {
    $PocketBaseStore.authStore.clear();
    PocketBaseStore.set($PocketBaseStore);
  }}>
    Logout
  </button>
</div>