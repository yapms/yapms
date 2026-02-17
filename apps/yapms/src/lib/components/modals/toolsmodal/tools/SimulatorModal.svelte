<script lang="ts">
	import { SimulatorModalStore } from '$lib/stores/Modals';
	import ModalBase from '../../ModalBase.svelte';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { CandidatesStore } from '$lib/stores/Candidates';

	let regions = $derived(
		$RegionsStore.sort().map((region) => {
			const candidates = $CandidatesStore.map((candidate) => {
				return {
					id: candidate.id,
					name: candidate.name,
					weight: 0
				};
			});

			return {
				id: region.id,
				name: region.longName,
				candidates: candidates
			};
		})
	);

	function calculate() {
		const regionsCopy = $RegionsStore;

		for (const region of regionsCopy) {
			const r2 = regions.find((r) => (r.id = region.id));
			if (r2 === undefined) {
				continue;
			}
			region.longName = 'TEST';
			for (const candidate of region.candidates) {
				console.log(candidate);
			}
		}

		$RegionsStore = regionsCopy;
	}
</script>

<ModalBase title="Simulator" store={SimulatorModalStore}>
	<div slot="content">
		<button class="btn" onclick={calculate}>Start</button>
		<fieldset class="fieldset">
			{#each regions as region}
				<table class="table">
					<thead>
						<tr>
							<td>{region.name}</td>
						</tr>
					</thead>
					<tbody>
						{#each region.candidates as candidate}
							<tr>
								<td class="w-[50%]">{candidate.name}</td>
								<td
									><input
										type="number"
										class="input input-info input-sm"
										bind:value={candidate.weight}
									/></td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			{/each}
		</fieldset>
	</div>
</ModalBase>
