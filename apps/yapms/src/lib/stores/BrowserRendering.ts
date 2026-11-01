import { browser } from '$app/env';
import { writable } from 'svelte/store';

const BrowserRenderingStore = writable({
	isChromium: false,
	hasHardwareGPU: false,
	ready: false
});

async function checkWebGPUAcceleration(): Promise<boolean> {
	try {
		const adapter = await (navigator as any).gpu?.requestAdapter();

		if (!adapter) return false;
		return !adapter.info?.isFallbackAdapater;
	} catch {
		return false;
	}
}

if (browser) {
	const isChromium =
		(navigator as any).userAgentData?.brands.some(
			(b: { brand: string }) => b.brand === 'Google Chrome'
		) ?? false;

	checkWebGPUAcceleration().then((hasHardwareGPU) => {
		BrowserRenderingStore.set({
			isChromium,
			hasHardwareGPU,
			ready: true
		});
	});
}

export { BrowserRenderingStore };
