<script lang="ts">
  import ModalTitle from "$lib/components/modalutilities/ModalTitle.svelte";
	import ArrowDownTray from "$lib/icons/ArrowDownTray.svelte";
	import ArrowUpTray from "$lib/icons/ArrowUpTray.svelte";
  import { ShareModalStore } from "$lib/stores/Modals";
	import saveToJson from "$lib/utils/saveToJson";
	import { CandidateSchema } from "$lib/types/Candidate";
	import { RegionSchema } from "$lib/types/Region";
	import { CandidatesStore, CandidateStoreSchema } from "$lib/stores/Candidates";
	import { RegionsStore } from "$lib/stores/Regions";
  import { get } from "svelte/store";

  let files: FileList;

  $: if (files && files.length > 0) {
    const fileReader = new FileReader();
    fileReader.readAsText(files[0]);
    fileReader.onload = function() {
      if (fileReader.result === null) {
        return;
      }
      const data = JSON.parse(fileReader.result.toString() ?? "")
      const tossup = CandidateSchema.parse(data.tossup);
      const candidates = CandidateSchema.array().parse(data.candidates);
      const regions = RegionSchema.omit({ shortName: true, longName: true, candidates: true, nodes: true }).array().parse(data.regions);
      console.log(tossup);
      console.log(candidates);
      console.log(regions);
      CandidatesStore.set(candidates);
      const regionsStoreCurrent = get(RegionsStore).map(currentRegion => {
        const loadedRegion = regions.find(r => r.id === currentRegion.id);

        if (loadedRegion === undefined) {
          return { ...currentRegion };
        }

        return {
          ...currentRegion,
          value: loadedRegion.value,
          disabled: loadedRegion.disabled,
          locked: loadedRegion.locked
        }
      });
      RegionsStore.set(regionsStoreCurrent);
    }
    fileReader.onerror = function() {
      console.log(fileReader.error);
    }
  }

</script>

<input type="checkbox" class="modal-toggle" checked={$ShareModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
  <div class="modal-box">
  <ModalTitle title="Share Map" />
  <div class="flex flex-row gap-4">

    <div>
      <h3 class="font-light text-lg pb-3">Save</h3>
      <button class="btn btn-secondary gap-1 flex-nowrap" on:click={saveToJson}>
        <ArrowDownTray class="w-5 h-5" />
        <span>Download</span>
      </button>
    </div>

    <div class="divider divider-horizontal" />

    <div class="flex flex-col gap-2">
      <h3 class="font-light text-lg pb-3">Load</h3>
      <input type="file" class="file-input file-input-primary w-full" bind:files />
      <button class="btn btn-secondary gap-1 flex-nowrap">
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