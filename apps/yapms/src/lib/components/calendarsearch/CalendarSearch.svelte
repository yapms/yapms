<script lang="ts">
	let { selectedCalendar = $bindable<string>('usa') } = $props();
</script>

<select class="select" bind:value={selectedCalendar}>
	<option value="usa_presidential">United States Presidential</option>
	<option value="can">Canada</option>
</select>
