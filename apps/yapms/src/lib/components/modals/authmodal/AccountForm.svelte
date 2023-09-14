<script>
	import { PocketBaseStore } from '$lib/stores/PocketBase';
</script>

<div class="flex flex-col gap-2">
	<h3 class="mb-2 text-center">
		Welcome, you are currently logged in as:<br />
		<span class="font-bold">{$PocketBaseStore.authStore.model?.email}</span>
	</h3>
	<button
		class="btn btn-sm btn-error"
		on:click={() => {
			$PocketBaseStore.authStore.clear();
			PocketBaseStore.set($PocketBaseStore);
		}}
	>
		Logout
	</button>
</div>
