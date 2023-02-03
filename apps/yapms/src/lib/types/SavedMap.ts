import { z } from 'zod';
import { CandidateSchema } from './Candidate';
import { SavedRegionSchema } from './Region';

export const SavedMapSchema = z.object({
  map: z.object({
    country: z.string(),
    type: z.string(),
    year: z.string()
  }),
  tossup: CandidateSchema,
  candidates: CandidateSchema.array(),
  regions: SavedRegionSchema.array(),
});

type SavedMap = z.infer<typeof SavedMapSchema>;

export default SavedMap;