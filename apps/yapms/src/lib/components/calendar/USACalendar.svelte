<script lang="ts">
	import cal from '../../assets/calendar/usa.json';
	import { parse } from 'date-fns';

	const presidential = cal.elections.find((type) => type.type === 'presidential');
	const presidentialElections =
		presidential?.data
			.sort((a, b) => (a.date < b.date ? 1 : -1))
			.map((election) => {
				const parsedDate = parse(
					election.date.toString(),
					'yyyyMMdd',
					new Date()
				).toLocaleDateString();

				return {
					date: parsedDate,
					mapLink: new URL(election.map_link, window.location.href),
					candidates: election.candidates
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
					<td>
						<ul class="flex flex-col gap-2">
							{#each election.candidates as candidate}
								<li class="flex flex-col">
									<span><b>{candidate.party}</b> - {candidate.name}</span>
									<span>Votes: {candidate.votes}</span>
								</li>
							{/each}
						</ul>
					</td>
					<td>
						<a href={election.mapLink.href} class="link">Open Map</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
