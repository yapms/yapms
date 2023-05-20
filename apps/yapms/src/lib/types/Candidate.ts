import { z } from 'zod';

export const CandidateSchema = z.object({
	id: z.string(),
	name: z.string(),
	count: z.number().optional(),
	margins: z.array(
		z.object({
			color: z.string()
		})
	)
});

//See https://github.com/colinhacks/zod#basic-usage for more on .infer
type Candidate = z.infer<typeof CandidateSchema>;

export default Candidate;
