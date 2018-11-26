export class Job {

    constructor(
        public id: number,
        public name: string,
        public createdAt: Date,
        public endDate: Date,
        public description: string,
        public qualifications: string
    ) {
    }
}
