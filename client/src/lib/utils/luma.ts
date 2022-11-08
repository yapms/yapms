function hexToRGB(hex: string) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	return { r, g, b };
}

function calculateLumaRGB(r: number, g: number, b: number) {
	return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function calculateLumaHEX(hex: string) {
	const { r, g, b } = hexToRGB(hex);
	const result = calculateLumaRGB(r, g, b);
	return result;
}

export { calculateLumaHEX, calculateLumaRGB };
