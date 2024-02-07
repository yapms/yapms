import { z } from 'zod';

export const CandidateSchema = z.object({
	id: z.string(),
	name: z.string(),
	defaultCount: z.number().default(0),
	margins: z.array(
		z.object({
			color: z.string()
		})
	)
});

export type Candidate = z.infer<typeof CandidateSchema>;
