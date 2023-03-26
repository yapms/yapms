<script lang="ts">
	import ModalTitle from '$lib/components/modalutilities/ModalTitle.svelte';
	import ArrowDownTray from '$lib/icons/ArrowDownTray.svelte';
	import ArrowUpTray from '$lib/icons/ArrowUpTray.svelte';
	import { ShareModalStore } from '$lib/stores/Modals';
	import { downloadJson, generateJson } from '$lib/utils/saveMap';
	import Link from '$lib/icons/Link.svelte';
	import { loadFromFile } from '$lib/utils/loadMap';
	import ExclamationCircle from '$lib/icons/ExclamationCircle.svelte';
	import { page } from '$app/stores';
	import CheckCircle from '$lib/icons/CheckCircle.svelte';
	import { get } from 'svelte/store';
	import { PocketBaseStore } from '$lib/stores/PocketBase';

	let files: FileList;

	let fetchingLinkID = false;
	let copiedLinkID = false;
	let linkID: string | null = null;

	function load() {
		if (files && files.length > 0) {
			loadFromFile(files);
			ShareModalStore.set({ ...$ShareModalStore, open: false });
		}
	}

	async function generateLink() {
		fetchingLinkID = true;

		const form = new FormData();

		const mapData = new File([JSON.stringify(generateJson())], 'data.json', {
			type: 'application/json',
		});

		form.append('data', mapData);

		const pocketbaseStore = get(PocketBaseStore);
		const record = await pocketbaseStore.collection("maps").create(form);
		linkID = record.id;
		fetchingLinkID = false;
	}

	async function copyLink() {
		if (fetchingLinkID) return;
		const url = new URL($page.url.origin + '/app?m=' + linkID);
		await navigator.clipboard.writeText(url.toString());
		copiedLinkID = true;
	}

	function close() {
		fetchingLinkID = false;
		copiedLinkID = false;
		linkID = null;
		ShareModalStore.set({ ...$ShareModalStore, open: false });
	}
</script>

<input type="checkbox" class="modal-toggle" checked={$ShareModalStore.open} />
<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<ModalTitle title="Share Map" />
		<div class="flex flex-row gap-4">
			<div class="flex flex-col gap-2">
				<h3 class="font-light text-lg pb-3">Save</h3>
				<button class="btn btn-secondary gap-1 flex-nowrap" on:click={downloadJson}>
					<ArrowDownTray class="w-5 h-5" />
					<span>Download</span>
				</button>
				<button
					class="btn btn-secondary gap-1 flex-nowrap"
					on:click={generateLink}
					disabled={fetchingLinkID}
				>
					<Link class="w-5 h-5" />
					<span>Generate Link</span>
				</button>
			</div>

			<div class="divider divider-horizontal" />

			<div class="flex flex-col gap-2">
				<h3 class="font-light text-lg pb-3">Load</h3>
				<input type="file" class="file-input file-input-primary w-full" bind:files />
				<button class="btn btn-secondary gap-1 flex-nowrap" on:click={load}>
					<ArrowUpTray class="w-5 h-5" />
					<span>Load</span>
				</button>
			</div>
		</div>

		<div
			class="alert shadow-lg mt-4 cursor-pointer transition-colors"
			class:hidden={!linkID && !fetchingLinkID}
			class:alert-warning={fetchingLinkID}
			class:alert-info={!copiedLinkID && !fetchingLinkID}
			class:alert-success={copiedLinkID && !fetchingLinkID}
			on:click={copyLink}
			on:keypress={copyLink}
		>
			<div>
				<label class="swap swap-flip">
					<input type="checkbox" checked={copiedLinkID} disabled />
					<ExclamationCircle class="swap-off w-6 h-6" />
					<CheckCircle class="swap-on w-6 h-6" />
				</label>
				<label class="swap">
					<input type="checkbox" checked={!fetchingLinkID && linkID !== null} disabled />
					<span class="swap-off">Generating Link...</span>
					<span class="swap-on">
						{$page.url.origin}/app?m={linkID}
					</span>
				</label>
			</div>
		</div>

		<div class="modal-action">
			<button class="btn btn-primary" on:click={close}> Close </button>
		</div>
	</div>
</div>
