<script lang="ts">
	import ArrowDownTray from '$lib/icons/ArrowDownTray.svelte';
	import ArrowUpTray from '$lib/icons/ArrowUpTray.svelte';
	import { ShareModalStore } from '$lib/stores/Modals';
	import { downloadJson, generateJson } from '$lib/utils/saveMap';
	import Link from '$lib/icons/Link.svelte';
	import { drawLoadedMap, gotoLoadedMap, setLoadedMapFromFile } from '$lib/stores/LoadedMap';
	import { loadFromFile, loadFromTCTFile } from '$lib/utils/loadMap';
	import ExclamationCircle from '$lib/icons/ExclamationCircle.svelte';
	import CheckCircle from '$lib/icons/CheckCircle.svelte';
	import { get } from 'svelte/store';
	import { PocketBaseStore } from '$lib/stores/PocketBase';
	import { Turnstile } from 'svelte-turnstile';
	import { PUBLIC_TURNSTILE_SITE } from '$env/static/public';
	import { fade } from 'svelte/transition';
	import ModalBase from '../ModalBase.svelte';
	import * as htmlToImage from 'html-to-image';
	import fileSaver from 'file-saver';
	import Camera from '$lib/icons/Camera.svelte';
	import { page } from '$app/state';
	import { ImportModalStore } from '$lib/stores/Modals';

	let isImported = $derived(page.url.pathname === '/app/imported');

	let files: FileList | undefined = $state();
	let tctFiles: FileList | undefined = $state();

	let fetchingLink = $state(false);
	let copiedLink = $state(false);
	let errorOnGenerateLink = $state(false);
	let linkID: string | null = $state(null);

	let turnstileToken: string | null = $state(null);
	let turnstileResetBind: (() => void | undefined) | undefined = $state(undefined);

	function resetTurnstile() {
		turnstileToken = null;
		turnstileResetBind?.();
	}

	function load() {
		if (files && files.length > 0) {
			setLoadedMapFromFile(files)
				.then(() => gotoLoadedMap({ s: true }))
				.then(drawLoadedMap);
			ShareModalStore.set({ ...$ShareModalStore, open: false });
		}
	}

	function loadTCT() {
		if (tctFiles && tctFiles.length > 0) {
			loadFromTCTFile(tctFiles);
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
		const url = new URL(page.url.origin + '/app?m=' + linkID);
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

	async function screenshot() {
		const mapChart = document.getElementById('map-chart-div');
		if (mapChart === null) {
			return;
		}

		mapChart.style.backgroundColor = 'hsl(var(--b1))';

		const data = await htmlToImage.toBlob(mapChart, {
			skipFonts: true
		});

		if (data !== null) {
			fileSaver.saveAs(data, 'YAPmsScreenshot.png');
		}

		mapChart.style.backgroundColor = '';
	}

	function openCustomModal() {
		$ShareModalStore.open = false;
		$ImportModalStore.open = true;
	}
</script>

<ModalBase title="Share Map" store={ShareModalStore} onClose={close}>
	<div slot="content">
		<div class="flex flex-col gap-4">
			<fieldset class="fieldset flex flex-col gap-2">
				<legend class="fieldset-legend">Load Local File</legend>
				<div class="flex flex-row gap-2">
					<input type="file" class="file-input w-full" bind:files />
					<button class="btn btn-primary" onclick={load}>
						<ArrowUpTray class="w-5 h-5" />
						<span>Load</span>
					</button>
				</div>
			</fieldset>

			<fieldset class="fieldset flex flex-col gap-2">
				<legend class="fieldset-legend">Save Local File</legend>
				<div class="flex flex-row gap-2">
					<button class="btn" disabled={isImported} onclick={downloadJson}>
						<ArrowDownTray class="w-5 h-5" />
						<span>Download</span>
					</button>
					<button class="btn" onclick={screenshot}>
						<Camera class="w-5 h-5" />
						<span>Screenshot</span>
					</button>
				</div>
			</fieldset>

			<fieldset class="fieldset flex flex-col gap-2">
				<legend class="fieldset-legend">
					Load <a href="https://www.newcampaigntrail.com" target="_blank" class="link">TCT</a> File
				</legend>
				<div class="flex flex-row gap-2">
					<input type="file" class="file-input w-full" bind:files={tctFiles} />
					<button class="btn btn-primary" onclick={loadTCT}>
						<ArrowUpTray class="w-5 h-5" />
						<span>Load</span>
					</button>
				</div>
			</fieldset>

			{#if isImported}
				<fieldset class="fieldset">
					<span>
						If you are looking to share your custom map, please click
						<button class="link" onclick={openCustomModal}>
							Export Current Map As SVG in the Custom Map dialog.
						</button>
					</span>
				</fieldset>
			{/if}

			{#if page.url.pathname !== '/app/imported'}
				<fieldset class="fieldset flex flex-col gap-2">
					<legend class="fieldset-legend">Generate Link</legend>
					<button
						class="btn btn-primary"
						onclick={generateLink}
						disabled={fetchingLink ||
							turnstileToken === null ||
							page.url.pathname === '/app/imported'}
					>
						<Link class="w-5 h-5" />
						<span>Generate a link to share with others!</span>
					</button>
					<button
						class="alert cursor-pointer transition-colors w-full"
						class:hidden={!linkID && !fetchingLink && !errorOnGenerateLink}
						class:alert-warning={fetchingLink}
						class:alert-info={!copiedLink && !fetchingLink}
						class:alert-success={copiedLink && !fetchingLink}
						class:alert-error={errorOnGenerateLink}
						onclick={copyLink}
					>
						<label class="swap swap-flip">
							<input
								type="checkbox"
								checked={copiedLink && errorOnGenerateLink === false}
								disabled
							/>
							<ExclamationCircle class="swap-off w-6 h-6" />
							<CheckCircle class="swap-on w-6 h-6" />
						</label>
						{#if fetchingLink === true}
							<span in:fade>Generating Link</span>
						{:else if linkID !== null}
							<span in:fade>{page.url.origin}/app?m={linkID}</span>
						{:else if errorOnGenerateLink === true}
							<span in:fade>Error Generating Link. Try Again Later.</span>
						{/if}
					</button>
				</fieldset>
			{/if}
		</div>
	</div>
	<div slot="action">
		{#if page.url.pathname !== '/app/imported'}
			<Turnstile
				siteKey={PUBLIC_TURNSTILE_SITE}
				on:callback={onTurnstileSuccess}
				on:expired={onTurnstileExpired}
				on:timeout={onTurnstileTimeout}
				on:error={onTurnstileError}
				bind:reset={turnstileResetBind}
			/>
		{/if}
	</div>
</ModalBase>
