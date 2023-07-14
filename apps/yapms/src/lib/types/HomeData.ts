type HomeLinkData = {
	label: string;
	route: string;
};

type HomeModalData = {
	label: string;
	buttons: HomeLinkData[];
};

export type { HomeLinkData, HomeModalData };
