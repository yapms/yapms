<script lang="ts">
	import { ChartPositionStore } from '$lib/stores/Chart';
	import { StyleModalStore } from '$lib/stores/Modals';
	import ModalTitle from '../../modalutilities/ModalTitle.svelte';

	function close() {
		StyleModalStore.set({
			...$StyleModalStore,
			open: false
		});
	}

	const themes = [
		//Hex codes can be found in node_modules/daisyui/src/colors/themes
		//name: id for theme, margins ['base-100','primary','secondary','accent']
		{ name: 'light', margins: ['#ffffff', '#570df8', '#f000b8', '#37cdbe'] },
		{ name: 'dark', margins: ['#2A303C', '#661AE6', '#D926AA', '#1FB2A5'] },
		{ name: 'cupcake', margins: ['#faf7f5', '#65c3c8', '#ef9fbc', '#eeaf3a'] },
		{ name: 'aqua', margins: ['#345da7', '#09ecf3', '#966fb3', '#ffe999'] },
		{ name: 'lofi', margins: ['#ffffff', '#0D0D0D', '#1A1919', '#262626'] },
		{ name: 'night', margins: ['#0F172A', '#38bdf8', '#818CF8', '#F471B5'] }
	];

	function sideChart() {
		ChartPositionStore.set('left');
	}

	function bottomChart() {
		ChartPositionStore.set('bottom');
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$StyleModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<ModalTitle title="Change Style" />
		<div class="flex flex-row lg:flex-col">
			<div class="flex flex-col">
				<h3 class="font-light text-lg pb-3">Themes</h3>
				<div class="flex flex-row gap-3 flex-wrap justify-center">
					{#each themes as theme}
						<button class="btn btn-lg" data-set-theme={theme.name} data-act-class="ACTIVECLASS">
							<div class="flex flex-col gap-2">
								<h3>{theme.name}</h3>
								<div class="flex flex-row gap-2">
									{#each theme.margins as margin}
										<div
											class="outline outline-1 outline-white w-4 h-4 rounded-full"
											style:background-color={margin}
										/>
									{/each}
								</div>
							</div>
						</button>
					{/each}
				</div>
			</div>

			<div class="divider divider-horizontal lg:divider-vertical" />

			<div class="flex flex-col">
				<h3 class="font-light text-lg pb-3">Chart Position</h3>
				<div class="flex gap-3 justify-center">
					<button
						class="btn btn-lg"
						class:btn-primary={$ChartPositionStore === 'bottom'}
						class:btn-success={$ChartPositionStore === 'left'}
						on:click={sideChart}
					>
						Side
					</button>
					<button
						class="btn btn-lg"
						class:btn-primary={$ChartPositionStore === 'left'}
						class:btn-success={$ChartPositionStore === 'bottom'}
						on:click={bottomChart}
					>
						Bottom
					</button>
				</div>
			</div>
		</div>
		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}>No</button>
		</div>
	</div>
</div>
