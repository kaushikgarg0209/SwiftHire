export interface IJob {
	companyName: string;
	companyLogo: string;
	jobTitle: string;
	jobDescription: string;
	location: string;
	CTC: number;
	createdAt: string;
}

export interface ICriterion {
	criteria: string;
	type: 'integer' | 'string';
	maxValue?: number;
	minValue?: number;
	value?: string;
}

export interface IStudentCriteria {
	criteria: string;
	value: number | string;
}

export interface IStudentInformation {
	resumeLink: string;
	currentCTC: number;
	criteria: IStudentCriteria[];
}
