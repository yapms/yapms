export function preventNonNumericalInput(e: KeyboardEvent & { currentTarget: HTMLInputElement }, allowDecimals = false) {
	const pattern = allowDecimals ? /^[0-9.]$/ : /^[0-9]$/;

	if (e.key === 'Enter') return;

	if (!e.key.match(pattern)) {
		e.preventDefault();
        return;
	}

	// if decimal, ensure we only ever have one decimal
	if (allowDecimals) {
		const decimalPattern = /^[0-9]+\.?[0-9]*$/;

		const { value, selectionStart, selectionEnd } = e.currentTarget;
    	const newValue = value.slice(0, selectionStart ?? 0) + e.key + value.slice(selectionEnd ?? 0);
		if (!newValue.match(decimalPattern)) e.preventDefault();
	}
}

export function preventNonNumericalPaste(e: ClipboardEvent, allowDecimals = false) {
	const pattern = allowDecimals ? /^[0-9]*\.?[0-9]+$/ : /^[0-9]+$/;
	const pasteContents = e.clipboardData?.getData(e.clipboardData.types[0]);
	if (!pasteContents?.match(pattern)) e.preventDefault();
}
