<script lang="ts">
	import type State from '$lib/types/State';

	export let open: boolean;
	export let state: State;
	export let onConfirm: (values: { shortName: string; newValue: number }) => void;
	export let onClose: () => void;

	let valueBind: HTMLInputElement;
	$: if (valueBind) {
		valueBind.value = state.value.toString();
	}

	function confirm() {
		onConfirm({ shortName: state.shortName, newValue: parseInt(valueBind.value, 10) });
	}
</script>

<input type="checkbox" class="modal-toggle" checked={open} />

<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Edit State {state.shortName} {state.value}</h3>
		<div class="flex flex-col pt-3">
			<input
				type="number"
				placeholder="Value"
				class="input input-bordered w-full"
				bind:this={valueBind}
			/>
		</div>
		<div class="modal-action">
			<button class="btn" on:click={onClose}> Close </button>
			<button class="btn" on:click={confirm}> Confirm </button>
		</div>
	</div>
</div>
