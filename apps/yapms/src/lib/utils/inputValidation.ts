export function preventNonNumericalInput(e: KeyboardEvent) {
	if (e.key !== 'Enter' && !e.key.match(/^[0-9]+$/)) e.preventDefault();
}

export function preventNonNumericalPaste(e: ClipboardEvent) {
	const pasteContents = e.clipboardData?.getData(e.clipboardData.types[0]);
	if (!pasteContents?.match(/^[0-9]+$/)) e.preventDefault();
}
