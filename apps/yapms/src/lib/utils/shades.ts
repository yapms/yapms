import Color from 'color';

const mixColor = Color('#FFFFFF');
const saturation = 0.5;
const colorsShiftAmount = 0.8;

export function generateShades(generateColor: string, generateAmount: number) {
	const generated = [];

	for (let step = 0; step < generateAmount; step++) {
		generated.push({
			color: Color(generateColor)
				.saturate((step / generateAmount) * saturation)
				.mix(Color(mixColor), (colorsShiftAmount * step) / generateAmount)
				.hex()
		});
	}

	return generated;
}
