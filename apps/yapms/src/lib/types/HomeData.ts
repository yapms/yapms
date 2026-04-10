export type HomeLinkData = {
	label: string;
	modalLabel?: string;
	route: string;
};

export type HomeGroupData = {
	label: string | undefined;
	routes: HomeLinkData[];
	showOnCard: boolean;
	showInModal: boolean;
};

export type HomeModalData = {
	label: string;
	buttons: HomeLinkData[];
};
