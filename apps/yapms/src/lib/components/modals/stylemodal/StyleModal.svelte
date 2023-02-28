<script lang="ts">
	import { ChartPositionStore } from '$lib/stores/Chart';
	import { StyleModalStore } from '$lib/stores/Modals';
	import ModalTitle from '../../modalutilities/ModalTitle.svelte';
	import ThemeGrid from './ThemeGrid.svelte';

	function close() {
		StyleModalStore.set({
			...$StyleModalStore,
			open: false
		});
	}

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
				<ThemeGrid />
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
