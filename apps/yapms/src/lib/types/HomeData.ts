export type HomeLinkData = {
	label: string;
	modalLabel?: string;
	route: string;
};

export type HomeModalData = {
	label: string;
	buttons: HomeLinkData[];
};
