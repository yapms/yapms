<script lang="ts">
  import { LoginModalStore } from '$lib/stores/Modals';
	import ModalTitle from '../../modalutilities/ModalTitle.svelte';
  import { PocketBaseStore } from '$lib/stores/PocketBase';
	import LoginForm from './LoginForm.svelte';
	import RegisterForm from './RegisterForm.svelte';
	import SocialButtons from './SocialButtons.svelte';
	import LogoutForm from './LogoutForm.svelte';

  let tab = 'login';

  function close() {
    LoginModalStore.set({
      ...$LoginModalStore,
      open: false
    });
  }
</script>

<input type="checkbox" class="modal-toggle" checked={$LoginModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
  <div class="modal-box">
    <ModalTitle title="Login" />
    <div class="flex flex-row justify-around gap-1">
      {#if $PocketBaseStore.authStore.isValid}
        <LogoutForm />
      {:else}
      <div class="flex flex-col gap-2">
        <div class="tabs justify-center">
          <input type="button" class="tab tab-bordered tab-lg" value="Login"
            class:tab-active={tab==="login"}
            on:click={() => {
              tab = 'login';
            }} />
          <input type="button" class="tab tab-bordered tab-lg" value="Register"
            class:tab-active={tab==="register"}
            on:click={() => {
              tab = 'register';
            }} />
          <input type="button" class="tab tab-bordered tab-lg" value="Social"
            class:tab-active={tab==="social"}
            on:click={() => {
              tab = 'social';
            }} />
        </div>
        {#if tab==="login"}
          <LoginForm />
        {:else if tab==="register"}
          <RegisterForm />
        {:else if tab==="social"}
          <SocialButtons />
        {/if}
      </div>
      {/if}
    </div>
    <div class="modal-action">
      <button class="btn btn-primary" on:click={close}>No</button>
    </div>
  </div>
</div>