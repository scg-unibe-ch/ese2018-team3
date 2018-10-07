export class JobItem {

    // TODO: adapt for jobs.
    constructor(
      public id: number,
      public jobListId: number,
      public name: string,
      public done: boolean,
      public company: string,
      public dateCreated: string,
      public endDate: string,
      public description: string,
      public qualifications: string
    ) {
    }
}
