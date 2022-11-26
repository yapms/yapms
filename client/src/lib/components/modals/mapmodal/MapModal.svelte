<script lang="ts">
  export let open: boolean;
  export let onClose: () => void;

  import usa from '$lib/assets/flags/usa.svg';
  import { fade } from 'svelte/transition';

  let selectedCountry: keyof typeof maps = "can"

  const countries = ["usa", "can", "gbr", "aus"];

  const maps = {
    "usa": ["president", "senate", "house"],
    "can": ["house of commons", "provinces"],
    "gbr": ["house of commons", "historic counties"],
    "aus": ["House of Representatives", "States"]
  }

  function isValidMap(country: string): country is keyof typeof maps {
    return Object.keys(maps).includes(country);
  }

  function setSelectedCountry(country: string) {
    if (isValidMap(country)) {
      selectedCountry = country;
    }
  }

  console.log("TEST");
</script>

{#if open}
<input type="checkbox" class="modal-toggle" checked={open} />
<div class="modal" transition:fade={{ duration: 100 }}>
  <div class="modal-box">
    <div class="tabs justify-evenly">
      {#each countries as country}
        <button class="tab tab-lg tab-bordered flex-row gap-1"
         class:tab-active={selectedCountry === country}
         on:click={() => {
          setSelectedCountry(country);
         }}
        >
          <img src={usa} alt="flag" class="w-9 rounded-sm" />
          <span>
            {country.toUpperCase()}
          </span>
        </button>
      {/each}
    </div>
    <div class="m-5">
      <div class="flex gap-2">
      {#each maps[selectedCountry] as map}
        <button class="btn btn-secondary">
          {map.toUpperCase()}
        </button>
      {/each}
      </div>
    </div>
    <div class="modal-action">
      <button class="btn btn-primary" on:click={onClose}>Close</button>
    </div>
  </div>
</div>
{/if}
