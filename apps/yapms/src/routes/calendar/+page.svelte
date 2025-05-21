<script lang="ts">
	import UsaCalendar from '$lib/components/calendar/USACalendar.svelte';
	import HomeNavBar from '$lib/components/navbar/HomeNavBar.svelte';
	let selectedCalendar = $state<string>('usa');
</script>

<div class="flex flex-col h-full overflow-hidden">
	<HomeNavBar calendarSearch={true} bind:selectedCalendar />
	{#if selectedCalendar === 'usa'}
		<UsaCalendar />
	{/if}
</div>
