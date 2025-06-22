<script lang="ts">
	import { SimulatorModalStore } from '$lib/stores/Modals';
	import ModalBase from '../../ModalBase.svelte';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import { CandidatesStore } from '$lib/stores/Candidates';

	function calculate() {}
</script>

<ModalBase title="Simulator" store={SimulatorModalStore}>
	<div slot="content">
		<button class="btn" onclick={calculate}>Start</button>
		<fieldset class="fieldset">
			{#each $RegionsStore.sort() as region}
				<table class="table">
					<thead>
						<tr>
							<td>{region.longName}</td>
						</tr>
					</thead>
					<tbody>
						{#each $CandidatesStore as candidate}
							<tr>
								<td class="w-[50%]">{candidate.name}</td>
								<td><input type="range" step="1" min="0" max="100" class="range" /></td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/each}
		</fieldset>
	</div>
</ModalBase>
