import { AutoStrokeMultiplierStore } from '$lib/stores/AutoStrokeMultiplierStore';
import { LockMapStore } from '$lib/stores/LockMap';
import panzoom, { type PanZoom } from 'panzoom';
import { get } from 'svelte/store';
import z from 'zod';

let panZoomSettings: { panzoom: PanZoom; svg: SVGElement } | undefined;
let autoStrokeSettings: { initStroke: number; upperStroke: number; svg: SVGElement } | undefined;

LockMapStore.subscribe((locked) => {
	lockMap(locked);
});

function lockMap(lock: boolean) {
	if (lock === true) {
		panZoomSettings?.panzoom.pause();
	} else {
		panZoomSettings?.panzoom.resume();
	}
}

function applyPanZoom(svg: SVGElement) {
	if (panZoomSettings !== undefined) {
		panZoomSettings.panzoom.dispose();
	}
	const panzoomInstance = panzoom(svg, {
		maxZoom: 500,
		autocenter: true,
		zoomDoubleClickSpeed: 1,
		smoothScroll: false,
		onTouch: (event) => {
			if (event.touches.length >= 2) {
				event.preventDefault();
			}
			return false;
		}
	});

	panZoomSettings = { panzoom: panzoomInstance, svg };
	lockMap(get(LockMapStore));
	connectZoomAndStroke();
}

function applyFastPanZoom(svg: SVGElement) {
	const panzoomInstance = panzoom(svg, {
		autocenter: true
	});
	panZoomSettings = { panzoom: panzoomInstance, svg };
	connectZoomAndStroke();
}

function applyAutoStroke(svg: SVGElement) {
	if (svg.hasAttribute('auto-border-stroke-width') === false) {
		return;
	}

	const initStroke = Number(svg.getAttribute('auto-border-stroke-width'));
	if (z.number().positive().finite().safeParse(initStroke).success === false) {
		return;
	}

	let upperStroke = Number(svg.getAttribute('auto-border-stroke-width-limit'));
	if (z.number().positive().safeParse(upperStroke).success === false) {
		upperStroke = Infinity;
	}

	autoStrokeSettings = {
		initStroke,
		upperStroke,
		svg
	};

	adjustStroke(1);
	connectZoomAndStroke();
}

function reapplyPanZoom() {
	if (panZoomSettings === undefined) {
		return;
	}
	panZoomSettings.panzoom.dispose();
	applyPanZoom(panZoomSettings.svg);
}

function connectZoomAndStroke() {
	if (panZoomSettings === undefined || autoStrokeSettings === undefined) {
		return;
	}
	adjustStroke(panZoomSettings.panzoom.getTransform().scale);
	panZoomSettings.panzoom.on('zoom', (e: PanZoom) => {
		adjustStroke(e.getTransform().scale);
	});
}

function adjustStroke(scale: number) {
	if (autoStrokeSettings === undefined) {
		return;
	}
	// Desired stroke width in SVG units given user & map settings
	const multiplier = get(AutoStrokeMultiplierStore); // 0..5
	const newStroke =
		Math.min(autoStrokeSettings.initStroke / scale, autoStrokeSettings.upperStroke) * multiplier;

	// Skia Graphite (new Chrome GPU backend) has problems anti-aliasing very thin strokes.
	// We can work around this by bringing the width up to a larger min value (MIN_ON_SCREEN_PX)
	// and decreasing opacity proportionally to width increase (down to MIN_OPACITY).
	const dpr = window.devicePixelRatio || 1;
	const onScreenPx = newStroke * scale * dpr; // Width the stroke will actually occupy on screen

	const MIN_ON_SCREEN_PX = 0.5; // minimum stroke width we draw; lower = more jagged
	const BASE_MIN_OPACITY = 0.25; // minimum opacity at multiplier = 1, so lines never vanish

	// Scale the floor by the multiplier so the slider still has a visible
	// effect while the stroke is stuck at its minimum width.
	const MIN_OPACITY = Math.min(BASE_MIN_OPACITY * multiplier, 1);

	let width = newStroke;
	let opacity = 1;

	// Opacity adjustment for small stroke
	if (onScreenPx < MIN_ON_SCREEN_PX) {
		width = MIN_ON_SCREEN_PX / (scale * dpr);
		opacity = Math.max(MIN_OPACITY, onScreenPx / MIN_ON_SCREEN_PX);
	}

	const style = autoStrokeSettings.svg.style;
	style.setProperty('--auto-border-stroke-width', `${width}px`);
	style.setProperty('--auto-border-stroke-opacity', `${opacity}`);
}

AutoStrokeMultiplierStore.subscribe(() => {
	const scale = panZoomSettings?.panzoom.getTransform().scale;
	if (scale !== undefined) {
		adjustStroke(scale);
	}
});

export { applyPanZoom, applyFastPanZoom, reapplyPanZoom, applyAutoStroke };
