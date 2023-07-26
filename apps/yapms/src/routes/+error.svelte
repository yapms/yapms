<script>
    import { page } from "$app/stores";
</script>

<div class="flex flex-col gap-y-12 w-full h-full justify-center items-center px-12">
    {#if $page.error?.message === 'Not Found'}
        <title>Page Not Found</title>
        <h1 class="text-5xl lg:text-6xl">Sorry, we couldn't find that page.</h1>
    {:else}
        <title>Error</title>
        <h1 class="text-5xl lg:text-6xl">Sorry, an unexpected error occured.</h1>
    {/if}
    <div class="flex flex-col w-full lg:w-auto lg:flex-row-reverse justify-center lg:gap-x-6 gap-y-6">
        <a href="/" class="btn btn-primary btn-lg btn-block max-w-xl">Home</a>
        <button on:click={() => {history.back()}} class="btn btn-lg btn-block max-w-xl">Previous Page</button>
    </div>
</div>