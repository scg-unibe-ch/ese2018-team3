import {Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {UserModel} from './user.model';

@Table
export class JobModel extends Model<JobModel> {

    @Column
    name!: string;

    @ForeignKey(() => UserModel)
    @Column
    userId!: number;

    @Column
    description!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    @Column
    endDate!: Date;

    @Column
    qualifications!: string;

    @Column
    isApproved!: boolean;

    @Column
    hasChanged!: boolean;

    toSimplification(): any {
        return {
            'id': this.id,
            'hasChanged': this.hasChanged,
            'userId': this.userId,
            'name': this.name,
            'description': this.description,
            'createdAt': this.createdAt,
            'updatedAt': this.updatedAt,
            'endDate': this.endDate,
            'qualifications': this.qualifications,
            'isApproved': this.isApproved
        };
    }

    fromSimplification(simplification: any): void {
        this.userId = simplification['userId'];
        this.name = simplification['name'];
        this.description = simplification['description'];
        this.createdAt = simplification['createdAt'];
        this.updatedAt = simplification['updatedAt'];
        this.endDate = simplification['endDate'];
        this.qualifications = simplification['qualifications'];
        this.isApproved = simplification['isApproved'];
        this.hasChanged = simplification['hasChanged'];
    }
}
