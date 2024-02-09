import { z } from 'zod';

export const CustomColorSchema = z.string().array();

export type CustomColor = z.infer<typeof CustomColorSchema>;
