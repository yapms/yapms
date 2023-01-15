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
	candidates: z.array(
		z.object({
			candidate: CandidateSchema,
			count: z.number(),
			margin: z.number(),
		})
	),
	nodes: z.object({
		region: z.custom<HTMLElement>((val) => val instanceof HTMLElement),
		button: z.custom<HTMLElement>((val) => val instanceof HTMLElement).nullable(),
		text: z.custom<HTMLElement>((val) => val instanceof HTMLElement).nullable(),
	}),
});

/*
type Region = {
	id: string;
	shortName: string;
	longName: string;
	value: number;
	permaVal: number;
	disabled: boolean;
	locked: boolean;
	candidates: Array<{ candidate: Candidate; count: number; margin: number }>;
	nodes: {
		region: HTMLElement;
		button: HTMLElement | null;
		text: HTMLElement | null;
	};
};
*/

type Region = z.infer<typeof RegionSchema>;

export default Region;
