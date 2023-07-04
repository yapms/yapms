import { z } from 'zod';
import { CandidateSchema } from './Candidate';
import { SavedRegionSchema } from './Region';

export const SavedMapSchema = z.object({
	map: z.object({
		country: z.string().regex(/^[a-z]+$/),
		type: z.string().regex(/^[a-z]+$/),
		year: z.string().regex(/^\d{4}$/)
	}),
	tossup: CandidateSchema,
	candidates: CandidateSchema.array(),
	regions: SavedRegionSchema.array()
});

type SavedMap = z.infer<typeof SavedMapSchema>;

export default SavedMap;
