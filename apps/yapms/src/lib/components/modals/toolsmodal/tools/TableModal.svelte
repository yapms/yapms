<script lang="ts">
	import { TableModalStore } from '$lib/stores/Modals';
	import { RegionsStore } from '$lib/stores/regions/Regions';
	import type { Region } from '$lib/types/Region';
	import ModalBase from '../../ModalBase.svelte';
	import { disableRegion, lockRegion } from '$lib/stores/regions/regionActions';
	import CandidateActions from './tablecomponents/CandidateActions.svelte';

	let filterInput = '';
	$: sortedAndFilteredRegions = $RegionsStore
		.filter((region) => {
			const lowerSearch = filterInput.toLowerCase().trim();
			return region.longName.toLowerCase().trim().includes(lowerSearch) || lowerSearch == '';
		})
		.sort((regionA, regionB) => {
			return regionA.longName > regionB.longName ? 1 : -1;
		});

	function preventNonNumericalInput(e: KeyboardEvent) {
		if (e.key !== 'Enter' && !e.key.match(/^[0-9]+$/)) e.preventDefault();
	}

	function preventNonNumericalPaste(e: ClipboardEvent) {
		const pasteContents = e.clipboardData?.getData(e.clipboardData.types[0]);
		if (!pasteContents?.match(/^[0-9]+$/)) e.preventDefault();
	}

	function updateRegionValue(
		event: Event & { currentTarget: EventTarget & HTMLInputElement },
		regionToUpdate: Region
	) {
		const newValue = Number(event.currentTarget.value);
		const index = $RegionsStore.findIndex((region) => region.id === regionToUpdate.id);
		if (!$RegionsStore[index].disabled) {
			//Don't update value if disabled so the state stays disabled!
			$RegionsStore[index].value = newValue;
		}
		$RegionsStore[index].permaVal = newValue;
	}
</script>

<ModalBase title="Regions Table" store={TableModalStore} fullWidth>
	<div slot="content">
		<input
			class="input input-bordered w-full"
			placeholder="Filter by region name"
			bind:value={filterInput}
		/>
		<div>
			<table class="table table-sm table-fixed min-w-[36rem]">
				<thead>
					<tr class="border-base-content border-opacity-50 text-md">
						<th style="width:15%;">Region</th>
						<th style="width:20%;">Candidate</th>
						<th style="width:10%;">Value</th>
						<th style="width:5%;">Disabled</th>
						<th style="width:5%;">Locked</th>
					</tr>
				</thead>
				{#if $TableModalStore.open}
					<tbody>
						{#each sortedAndFilteredRegions as region (region.id)}
							<tr class="border-base-content border-opacity-20">
								<td>
									<p class="truncate font-semibold">{region.longName}</p>
								</td>
								<td>
									<CandidateActions {region} />
								</td>
								<td>
									<input
										type="number"
										class="input input-sm input-bordered w-full"
										min="0"
										on:input={(e) => updateRegionValue(e, region)}
										on:keypress={preventNonNumericalInput}
										on:paste={preventNonNumericalPaste}
										value={region.permaVal}
									/>
								</td>
								<td>
									<input
										type="checkbox"
										class="toggle"
										checked={region.disabled}
										on:change={() => {
											disableRegion(region.id);
										}}
									/>
								</td>
								<td>
									<input
										type="checkbox"
										class="toggle"
										checked={region.locked}
										on:change={() => {
											lockRegion(region.id);
										}}
									/>
								</td>
							</tr>
						{/each}
					</tbody>
				{/if}
			</table>
		</div>
	</div>
</ModalBase>
