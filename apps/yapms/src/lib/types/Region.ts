import type Candidate from './Candidate';

type Region = {
	id: string;
	shortName: string;
	longName: string;
	value: number;
	permaVal: number;
	disabled: boolean;
	locked: boolean;
	candidates: Array<{ candidate: Candidate; count: number; margin: number }>;
	nodes: {
		region: HTMLElement;
		button: HTMLElement | null;
		text: HTMLElement | null;
	};
};

export default Region;
