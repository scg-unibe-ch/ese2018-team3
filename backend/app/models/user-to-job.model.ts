import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {JobModel, User} from './';

@Table
export class UserToJobModel extends Model<UserToJobModel> {

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => JobModel)
    @Column
    jobId!: number;

    toSimplification(): any {
        return {
            'id': this.id,
            'userId': this.userId,
            'jobId': this.jobId
        };
    }

    fromSimplification(simplification: any): void {
        this.userId = simplification['userId'];
        this.jobId = simplification['jobId'];
    }
}
