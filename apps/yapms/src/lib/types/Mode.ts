import { z } from 'zod';

//Add values for Mode up here
export const ModeSchema = z.enum(['fill', 'split', 'edit', 'disable', 'lock']);

//Zod then turns the above array into a type
export type Mode = z.infer<typeof ModeSchema>;
