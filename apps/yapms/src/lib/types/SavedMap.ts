import { z } from 'zod';
import { CandidateSchema } from './Candidate';
import { SavedRegionSchema } from './Region';

const countries = ['usa'] as const;

const types = ['presidential'] as const;

const years = ['2022'] as const;

export const SavedMapSchema = z.object({
	map: z.object({
		country: z.enum(countries),
		type: z.enum(types),
		year: z.enum(years)
	}),
	tossup: CandidateSchema,
	candidates: CandidateSchema.array(),
	regions: SavedRegionSchema.array()
});

type SavedMap = z.infer<typeof SavedMapSchema>;

export default SavedMap;
