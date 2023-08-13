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
		minZoom: 0.5,
		maxZoom: 100,
		autocenter: true,
		zoomDoubleClickSpeed: 1,
		smoothScroll: false,
		onTouch: function () {
			return false;
		}
	});

	panZoomSettings = { panzoom: panzoomInstance, svg };
	lockMap(get(LockMapStore));
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
	const newStroke = Math.min(autoStrokeSettings.initStroke / scale, autoStrokeSettings.upperStroke);
	autoStrokeSettings.svg.style.setProperty('--auto-border-stroke-width', `${newStroke}px`);
}

export { applyPanZoom, reapplyPanZoom, applyAutoStroke };
