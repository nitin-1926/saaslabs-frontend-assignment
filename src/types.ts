export enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
}

export interface Project {
	's.no': number;
	'percentage.funded': number;
	'amt.pledged': number;
	title: string;
	blurb: string;
	by: string;
	location: string;
	'num.backers': string;
	state: string;
}
