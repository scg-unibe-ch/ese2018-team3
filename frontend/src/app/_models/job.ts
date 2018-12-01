export class Job {

    constructor(
        public id: number,
        public userId: number,
        public name: string,
        public description: string,
        public createdAt: Date,
        public updatedAt: Date,
        public endDate: Date,
        public occupation: string,
        public qualifications: string,
        public contact: string,
        public isApproved: boolean,
        public hasChanged: boolean
    ) {
    }
}
