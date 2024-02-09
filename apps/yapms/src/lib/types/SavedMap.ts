import { z } from 'zod';
import { CandidateSchema } from './Candidate';
import { SavedRegionSchema } from './Region';

export const SavedMapSchema = z.object({
	map: z.object({
		country: z.string().regex(/^[\w-]+$/),
		type: z.string().regex(/^[\w-]+$/),
		year: z
			.string()
			.regex(/^[\w-]+$/)
			.optional(),
		variant: z
			.string()
			.regex(/^[\w-]+$/)
			.optional()
	}),
	tossup: CandidateSchema,
	candidates: CandidateSchema.array(),
	regions: SavedRegionSchema.array()
});

export type SavedMap = z.infer<typeof SavedMapSchema>;
