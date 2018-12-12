export class Job {

    constructor(
        public id: number,
        public userId: number,
        public companyName: string,
        public title: string,
        public description: string,
        public createdAt: Date,
        public updatedAt: Date,
        public start: Date,
        public endDate: Date,
        public occupation: string,
        public qualifications: string,
        public remarks: string,
        public salary: string,
        public contact: string,
        public isApproved: boolean,
        public hasChanged: boolean
    ) {
    }
}
