<script lang="ts">
	export let open: boolean;
	export let onClose: () => void;

	import usa_flag from '$lib/assets/flags/usa.svg';
	import can_flag from '$lib/assets/flags/can.svg';
	import gbr_flag from '$lib/assets/flags/gbr.svg';
	import aus_flag from '$lib/assets/flags/aus.svg';
	import { fade } from 'svelte/transition';

	let selectedCountry: keyof typeof maps = 'can';

	const countries = ['usa', 'can', 'gbr', 'aus'];

	const maps = {
		usa: ['president', 'senate', 'house'],
		can: ['house of commons', 'provinces'],
		gbr: ['house of commons', 'historic counties'],
		aus: ['House of Representatives', 'States']
	};

	const flags = {
		usa: usa_flag,
		can: can_flag,
		gbr: gbr_flag,
		aus: aus_flag
	};

	function isValidMap(country: string): country is keyof typeof maps {
		return Object.keys(maps).includes(country);
	}

	function setSelectedCountry(country: string) {
		if (isValidMap(country)) {
			selectedCountry = country;
		}
	}

	console.log('TEST');
</script>

{#if open}
	<input type="checkbox" class="modal-toggle" checked={open} />
	<div class="modal" transition:fade={{ duration: 100 }}>
		<div class="modal-box">
			<div class="tabs justify-evenly">
				{#each countries as country}
					<button
						class="tab tab-lg tab-bordered flex-row gap-1"
						class:tab-active={selectedCountry === country}
						on:click={() => {
							setSelectedCountry(country);
						}}
					>
						<img src={flags[country]} alt="flag" class="w-12 rounded-sm" />
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
