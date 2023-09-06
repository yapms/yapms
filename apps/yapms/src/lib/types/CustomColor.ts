import { z } from 'zod';

export const CustomColorSchema = z.string().array();

type CustomColor = z.infer<typeof CustomColorSchema>;

export default CustomColor;
