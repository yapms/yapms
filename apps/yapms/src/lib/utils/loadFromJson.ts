import { CandidatesStore } from "$lib/stores/Candidates";
import { RegionsStore } from "$lib/stores/Regions";
import type Candidate from "$lib/types/Candidate";
import type Region from "$lib/types/Region";

interface ILoadFromJson {
  tossup: Candidate;
  candidates: Candidate[];
  regions: Region[];
}

function loadFromJson(json: ILoadFromJson): void {
  CandidatesStore.set(json.candidates);
  RegionsStore.set(json.regions);
  console.log(json);
}