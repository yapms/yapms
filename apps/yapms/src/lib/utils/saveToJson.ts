import { TossupCandidateStore, CandidatesStore } from "$lib/stores/Candidates";
import { RegionsStore } from "$lib/stores/Regions";
import { get } from "svelte/store";

import { saveAs } from "file-saver";

function saveToJson(): void {
  const tossupStore = get(TossupCandidateStore);
  const candidateStore = get(CandidatesStore);
  const regionStore = get(RegionsStore).map((region) => ({
    id: region.id,
    value: region.value,
    candidate: region.candidates,
    permaVal: region.permaVal,
    locked: region.locked,
    disabled: region.disabled,
  }));

  const data = {
    tossup: tossupStore,
    candidates: candidateStore,
    regions: regionStore,
  }

  console.log(JSON.stringify(data));

  saveAs(new Blob([JSON.stringify(data)], { type: "text/plain;charset=utf-8" }), "data.json");
}

export default saveToJson;