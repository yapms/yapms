import { CandidateSchema } from './Candidate';
import { z } from 'zod';

export const RegionSchema = z.object({
	id: z.string(),
	shortName: z.string(),
	longName: z.string(),
	value: z.number(),
	permaVal: z.number(),
	disabled: z.boolean(),
	locked: z.boolean(),
	candidates: z
		.object({
			candidate: CandidateSchema,
			count: z.number(),
			margin: z.number()
		})
		.array(),
	nodes: z.object({
		region: z.custom<HTMLElement>((val) => val instanceof HTMLElement),
		button: z.custom<HTMLElement>((val) => val instanceof HTMLElement).nullable(),
		text: z.custom<HTMLElement>((val) => val instanceof HTMLElement).nullable()
	})
});

export const SavedRegionSchema = RegionSchema.omit({
	shortName: true,
	longName: true,
	nodes: true,
	candidates: true
}).extend({
	candidates: z
		.object({
			id: z.string(),
			count: z.number(),
			margin: z.number()
		})
		.array()
});

type Region = z.infer<typeof RegionSchema>;

export default Region;
