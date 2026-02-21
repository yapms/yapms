export type HomeLinkData = {
	label: string;
	modalLabel?: string;
	route: string;
};

export type HomeGroupData = {
	label: string | undefined;
	routes: HomeLinkData[];
}

export type HomeModalData = {
	label: string;
	buttons: HomeLinkData[];
};
