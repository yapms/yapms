export function keyCodeToNumber(code: string): number | null {
	switch (code) {
		case 'Digit0':
			return 0;
		case 'Digit1':
			return 1;
		case 'Digit2':
			return 2;
		case 'Digit3':
			return 3;
		case 'Digit4':
			return 4;
		case 'Digit5':
			return 5;
		case 'Digit6':
			return 6;
		case 'Digit7':
			return 7;
		case 'Dkgit8':
			return 8;
		case 'Digit9':
			return 9;
	}
	return null;
}
