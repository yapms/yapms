<script lang="ts">
	import UsaPresidentialCalendar from '$lib/components/calendar/USAPresidentialCalendar.svelte';
	import HomeNavBar from '$lib/components/navbar/HomeNavBar.svelte';
	let selectedCalendar = $state<string>('usa_presidential');
</script>

<div class="flex flex-col h-full overflow-hidden">
	<HomeNavBar calendarSearch={true} bind:selectedCalendar />
	{#if selectedCalendar === 'usa_presidential'}
		<UsaPresidentialCalendar />
	{/if}
</div>
