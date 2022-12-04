import { RegionsStore } from "$lib/stores/Regions";
import { TossupCandidateStore, SelectedCandidateStore } from "$lib/stores/Candidates";
import type { Region } from '$lib/types/Region';
import { get } from 'svelte/store';
import { ModeStore } from "$lib/stores/Mode";

function fillRegion(regionID: string) {
  const regions = get(RegionsStore);
  const region = regions.find((region) => region.id === regionID);
  if (region) {
    const selectedCandidate = get(SelectedCandidateStore);
    region.candidates = [
      selectedCandidate
    ];
    /*
    region.nodes.region.style.fill = selectedCandidate.margins[0].color;
    if (region.nodes.button)
    region.nodes.button.style.fill = selectedCandidate.margins[0].color;
    if (region.nodes.text)
    region.nodes.text.style.color = calculateLumaHEX(selectedCandidate.margins[0].color) > 0.5 ? 'black' : 'white';
    */
    RegionsStore.set(regions);
  }
}

function loadRegions(node: HTMLDivElement) {
  const regionsForStore: Region[] = [];
  const regions = node.querySelector('.regions');
  const buttons = node.querySelector('.region-buttons');
  const texts = node.querySelector('.region-texts');
  const tossupCandidate = get(TossupCandidateStore);
  regions?.childNodes.forEach((childNode) => {
    const childHTML = childNode as HTMLElement;
    if (childHTML.getAttribute === undefined) {
      return;
    }
    childHTML.style.cursor = 'pointer';

    const newRegion: Region = {
      id: childHTML.getAttribute('class') ?? '',
      shortName: childHTML.getAttribute('short-name') ?? '',
      longName: childHTML.getAttribute('long-name') ?? '',
      value: parseInt(childHTML.getAttribute('value') ?? '0'),
      disabled: false,
      candidates: [],
      nodes: {
        region: childHTML,
        button: buttons?.querySelector(`[for="${childHTML.getAttribute('class') ?? ''}"]`) as HTMLElement,
        text: texts?.querySelector(`[for="${childHTML.getAttribute('class') ?? ''}"]`) as HTMLElement
      },
    }
    
    childHTML.onclick = () => {
      switch (get(ModeStore)) {
        case 'fill':
          fillRegion(newRegion.id);
          break;
      }
    }

    newRegion.nodes.region.style.fill = tossupCandidate.margins[0].color;
    if (newRegion.nodes.button) {
      newRegion.nodes.button.style.fill = tossupCandidate.margins[0].color;
    }
    if (newRegion.nodes.text) {
      newRegion.nodes.text.style.pointerEvents = 'none';
      const bottom = newRegion.nodes.text.querySelector('.bottom');
      if (bottom) {
        bottom.textContent = newRegion.value.toString();
      }
    }
    regionsForStore.push(newRegion);
  });

  RegionsStore.set(regionsForStore);
}

export default loadRegions;
