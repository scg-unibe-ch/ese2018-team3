export class JobItem {

	constructor(
		public id: number,
		public jobListId: number,
		public name: string,
		public dateCreated: Date,
		public endDate: Date,
		public description: string,
		public qualifications: string
	) {
	}
}
