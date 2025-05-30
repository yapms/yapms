<script lang="ts">
	import cal from '../../assets/calendar/usa.json';
	import { format, parse } from 'date-fns';

	const presidential = cal.elections.find((type) => type.type === 'presidential');
	const presidentialElections =
		presidential?.data
			.sort((a, b) => (a.date < b.date ? 1 : -1))
			.map((election) => {
				const parsedDate = parse(election.date.toString(), 'yyyyMMdd', new Date());

				return {
					date: format(parsedDate, 'MMMM do y'),
					mapLink: new URL(election.map_link, window.location.href),
					candidates: election.candidates
						// sort candidates by party name
						.sort((a, b) => a.party.localeCompare(b.party))
						// collect the data
						.map((candidate) => {
							return {
								name: candidate.name,
								party: candidate.party,
								votes: candidate.votes
							};
						})
				};
			}) ?? [];
</script>

<div class="p-8">
	<table class="table">
		<thead>
			<tr>
				<th>Presidential</th>
				<th>Candidates</th>
			</tr>
		</thead>
		<tbody>
			{#each presidentialElections as election}
				<tr>
					<th>{election.date}</th>
					{#each election.candidates as candidate}
						<td>
							<div class="flex flex-col">
								<span><b>{candidate.party}:</b> {candidate.name}</span>
								{#if candidate.votes !== null}
									<span><b>Votes:</b> {candidate.votes}</span>
								{/if}
							</div>
						</td>
					{/each}
					<td>
						<a href={election.mapLink.href} class="link">Open Map</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
