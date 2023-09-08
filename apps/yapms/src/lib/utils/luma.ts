function hexToRGB(hex: string) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	return { r, g, b };
}

function blendHexForLuma(hexes: string[]) {
	let rCombined = 0,
		gCombined = 0,
		bCombined = 0;
	for (const hex of hexes) {
		const { r, g, b } = hexToRGB(hex);
		rCombined += r;
		gCombined += g;
		bCombined += b;
	}
	rCombined /= hexes.length;
	gCombined /= hexes.length;
	bCombined /= hexes.length;
	rCombined = Math.floor(rCombined);
	gCombined = Math.floor(gCombined);
	bCombined = Math.floor(bCombined);
	return rCombined.toString(16) + gCombined.toString(16) + bCombined.toString(16);
}

function calculateLumaRGB(r: number, g: number, b: number): number {
	return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function calculateLumaHEX(hex: string): number {
	const { r, g, b } = hexToRGB(hex);
	const result = calculateLumaRGB(r, g, b);
	return result;
}

export { blendHexForLuma, calculateLumaHEX, calculateLumaRGB };
