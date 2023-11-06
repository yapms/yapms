import { CandidateSchema } from './Candidate';
import { z } from 'zod';

export const RegionSchema = z.object({
	id: z.string(),
	fillGroup: z.number().optional(),
	shortName: z.string(),
	longName: z.string(),
	value: z.number(),
	permaVal: z.number(),
	disabled: z.boolean(),
	locked: z.boolean(),
	permaLocked: z.boolean(),
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

export const RegionCandidateSchema = z.object({
	candidate: CandidateSchema,
	count: z.number(),
	margin: z.number()
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

export const SavedRegionCandidatesSchema = z
	.object({
		candidate: z.string(),
		count: z.number().nonnegative(),
		margin: z.number().nonnegative()
	})
	.array();

type Region = z.infer<typeof RegionSchema>;

export type RegionCandidate = z.infer<typeof RegionCandidateSchema>;

export type SavedRegionCandidates = z.infer<typeof SavedRegionCandidatesSchema>;

export default Region;
