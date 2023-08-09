<script lang="ts">
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
	import { Turnstile } from 'svelte-turnstile';
	import { PUBLIC_TURNSTILE_SITE } from '$env/static/public';
	import { fade } from 'svelte/transition';
	import ModalBase from '../ModalBase.svelte';

	let files: FileList;

	let fetchingLink = false;
	let copiedLink = false;
	let errorOnGenerateLink = false;
	let linkID: string | null = null;

	let turnstileToken: string | null = null;
	let turnstileResetBind: () => void | undefined;

	function resetTurnstile() {
		turnstileToken = null;
		turnstileResetBind?.();
	}

	function load() {
		if (files && files.length > 0) {
			loadFromFile(files);
			ShareModalStore.set({ ...$ShareModalStore, open: false });
		}
	}

	async function generateLink() {
		if (turnstileToken === null) {
			resetTurnstile();
			return;
		}

		copiedLink = false;
		errorOnGenerateLink = false;
		fetchingLink = true;

		const form = new FormData();

		const mapData = new File([JSON.stringify(generateJson())], 'data.json', {
			type: 'application/json'
		});

		form.append('data', mapData);
		form.append('turnstile-token', turnstileToken);

		const pocketbaseStore = get(PocketBaseStore);
		try {
			const record = await pocketbaseStore.collection('maps').create(form);
			linkID = record.id;
		} catch (error) {
			errorOnGenerateLink = false;
			console.error(error);
		}
		fetchingLink = false;
		turnstileToken = null;
		resetTurnstile();
	}

	async function copyLink() {
		if (fetchingLink) return;
		const url = new URL($page.url.origin + '/app?m=' + linkID);
		await navigator.clipboard.writeText(url.toString());
		copiedLink = true;
	}

	function close() {
		fetchingLink = false;
		copiedLink = false;
		errorOnGenerateLink = false;
		linkID = null;
		$ShareModalStore.open = false;
	}

	function onTurnstileSuccess(event: CustomEvent<{ token: string }>) {
		turnstileToken = event.detail.token;
	}

	function onTurnstileError() {
		turnstileToken = null;
	}

	function onTurnstileTimeout() {
		turnstileToken = null;
	}

	function onTurnstileExpired() {
		turnstileToken = null;
	}
</script>

<ModalBase title="Share Map" store={ShareModalStore} onClose={close}>
	<div slot="content">
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
					disabled={fetchingLink || turnstileToken === null}
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

		<button
			class="alert mt-4 cursor-pointer transition-colors"
			class:hidden={!linkID && !fetchingLink && !errorOnGenerateLink}
			class:alert-warning={fetchingLink}
			class:alert-info={!copiedLink && !fetchingLink}
			class:alert-success={copiedLink && !fetchingLink}
			class:alert-error={errorOnGenerateLink}
			on:click={copyLink}
		>
			<label class="swap swap-flip">
				<input type="checkbox" checked={copiedLink && errorOnGenerateLink === false} disabled />
				<ExclamationCircle class="swap-off w-6 h-6" />
				<CheckCircle class="swap-on w-6 h-6" />
			</label>
			{#if fetchingLink === true}
				<span in:fade>Generating Link</span>
			{:else if linkID !== null}
				<span in:fade>{$page.url.origin}/app?m={linkID}</span>
			{:else if errorOnGenerateLink === true}
				<span in:fade>Error Generating Link. Try Again Later.</span>
			{/if}
		</button>
	</div>
	<div slot="action">
		<Turnstile
			siteKey={PUBLIC_TURNSTILE_SITE}
			on:turnstile-callback={onTurnstileSuccess}
			on:turnstile-expired={onTurnstileExpired}
			on:turnstile-timeout={onTurnstileTimeout}
			on:turnstile-error={onTurnstileError}
			bind:reset={turnstileResetBind}
		/>
	</div>
</ModalBase>
