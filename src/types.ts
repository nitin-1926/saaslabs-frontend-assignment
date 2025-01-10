// Theme options for the application
export enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
}

// Shape of a project from the API
// Adding only the fields that are used in the table
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
