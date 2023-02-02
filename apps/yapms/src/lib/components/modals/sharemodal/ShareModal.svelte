<script lang="ts">
  import ModalTitle from "$lib/components/modalutilities/ModalTitle.svelte";
	import ArrowDownTray from "$lib/icons/ArrowDownTray.svelte";
	import ArrowUpTray from "$lib/icons/ArrowUpTray.svelte";
  import { ShareModalStore } from "$lib/stores/Modals";
	import { downloadJson, generateJson } from "$lib/utils/saveMap";
	import Link from "$lib/icons/Link.svelte";
	import { loadFromFile } from "$lib/utils/loadMap";

  let files: FileList;

  function load() {
    if (files && files.length > 0) {
      loadFromFile(files);
      ShareModalStore.set({ ...$ShareModalStore, open: false });
    }
  }

  async function generateLink() {
    const blob = new Blob(
      [JSON.stringify(generateJson())],
      { type: "application/json" }
    );

    const formData = new FormData();
    formData.append("data", blob, "data.json");

    const url = new URL("http://localhost:8080/api/yapms.com/map");
    await fetch(url, {
      method: "POST",
      body: formData,
    });
  }

</script>

<input type="checkbox" class="modal-toggle" checked={$ShareModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
  <div class="modal-box">
  <ModalTitle title="Share Map" />
  <div class="flex flex-row gap-4">

    <div class="flex flex-col gap-2">
      <h3 class="font-light text-lg pb-3">Save</h3>
      <button class="btn btn-secondary gap-1 flex-nowrap" on:click={downloadJson}>
        <ArrowDownTray class="w-5 h-5" />
        <span>Download</span>
      </button>
      <button class="btn btn-secondary gap-1 flex-nowrap" on:click={generateLink}>
        <Link class="w-5 h-5" />
        <span>Generate Link</span>
      </button>
    </div>

    <div class="divider divider-horizontal" />

    <div class="flex flex-col gap-2">
      <h3 class="font-light text-lg pb-3">Load</h3>
      <input type="file" class="file-input file-input-primary w-full" bind:files />
      <button class="btn btn-secondary gap-1 flex-nowrap"
        on:click={load}
      >
        <ArrowUpTray class="w-5 h-5" />
        <span>Load</span>
    </div>

  </div>
  <div class="modal-action">
    <button class="btn btn-primary" on:click={() => ShareModalStore.set({ ...$ShareModalStore, open: false })}>
      Close
    </button>
  </div>
  </div>
</div>