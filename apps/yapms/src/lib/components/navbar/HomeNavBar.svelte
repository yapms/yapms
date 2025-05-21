<script lang="ts">
	import ArrowUpTray from '$lib/icons/ArrowUpTray.svelte';
	import Calendar from '$lib/icons/Calendar.svelte';
	import Login from '$lib/icons/Login.svelte';
	import Swatch from '$lib/icons/Swatch.svelte';
	import { AuthModalStore, ImportModalStore, ThemeModalStore } from '$lib/stores/Modals';
	import CalendarSearch from '../calendarsearch/CalendarSearch.svelte';
	import MapSearch from '../mapsearch/MapSearch.svelte';

	let {
		data,
		calendarSearch,
		selectedCalendar = $bindable<string>('')
	}: {
		data?: { title: string; route: string }[];
		calendarSearch?: boolean;
		selectedCalendar?: string;
	} = $props();

	function openThemeModal() {
		ThemeModalStore.set({
			...$ThemeModalStore,
			open: true
		});
	}

	function openImportModal() {
		ImportModalStore.set({
			...$ImportModalStore,
			open: true
		});
	}

	function openAuthModal() {
		AuthModalStore.set({
			...$AuthModalStore,
			open: true
		});
	}
</script>

<div class="navbar bg-base-300">
	<div class="navbar-start w-auto grow">
		<a class="btn text-2xl font-bold" href="/">YAPMS</a>
	</div>
	<div class="navbar-center w-auto grow hidden lg:inline">
		{#if data !== undefined}
			<MapSearch {data} />
		{/if}
		{#if calendarSearch === true}
			<CalendarSearch bind:selectedCalendar />
		{/if}
	</div>
	<ul class="navbar-end w-auto grow gap-1 menu menu-horizontal">
		<a href="/calendar" class="btn btn-circle">
			<Calendar class="h-6 w-6" />
		</a>
		<button class="btn btn-circle" on:click={openImportModal}>
			<ArrowUpTray class="h-6 m-auto" />
		</button>
		<button class="btn btn-circle" on:click={openThemeModal}>
			<Swatch class="h-6 m-auto" />
		</button>
		<button class="btn btn-circle" on:click={openAuthModal}>
			<Login class="h-6 m-auto" />
		</button>
	</ul>
</div>
