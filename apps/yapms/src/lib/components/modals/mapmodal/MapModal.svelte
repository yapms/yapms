<script lang="ts">
	import { MapModalStore } from '$lib/stores/Modals';

	import usa_flag from '$lib/assets/flags/usa.svg';
	import can_flag from '$lib/assets/flags/can.svg';
	import gbr_flag from '$lib/assets/flags/gbr.svg';
	import aus_flag from '$lib/assets/flags/aus.svg';

	let selectedCountryName = 'usa';

	const countries = [
		{ name: 'usa', flag: usa_flag, maps: ['president', 'senate', 'house'] },
		{ name: 'can', flag: can_flag, maps: ['house of commons', 'provinces'] },
		{ name: 'gbr', flag: gbr_flag, maps: ['house of commons', 'historic counties'] },
		{ name: 'aus', flag: aus_flag, maps: ['house of representatives', 'States'] }
	];

	$: selectedCountry =
		countries.find((country) => country.name === selectedCountryName) ?? countries[0];

	function close() {
		MapModalStore.set({
			...$MapModalStore,
			open: false
		});
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$MapModalStore.open} />
<div class="modal">
	<div class="modal-box">
		<div class="tabs justify-evenly">
			{#each countries as country}
				<button
					class="tab tab-lg tab-bordered flex-row gap-1"
					class:tab-active={selectedCountryName === country.name}
					on:click={() => {
						selectedCountryName = country.name;
					}}
				>
					<img src={country.flag} alt="flag" class="w-12 rounded-sm" />
					<span>
						{country.name.toUpperCase()}
					</span>
				</button>
			{/each}
		</div>
		<div class="m-5">
			<div class="flex gap-2">
				{#each selectedCountry.maps as map}
					<button class="btn btn-secondary">
						{map.toUpperCase()}
					</button>
				{/each}
			</div>
		</div>
		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}>Close</button>
		</div>
	</div>
</div>
