import {Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {UserModel} from './user.model';

@Table
export class JobModel extends Model<JobModel> {

    @Column
    title!: string;

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
    start!: Date;

    // work %
    @Column
    occupation!: string

    @Column
    qualifications!: string;

    @Column
    remarks!: string;

    @Column
    salary!: string;

    @Column
    contact!: string;

    @Column
    isApproved!: boolean;

    @Column
    hasChanged!: boolean;

    toSimplification(): any {
        return {
            'id': this.id,
            'userId': this.userId,
            'title': this.title,
            'description': this.description,
            'createdAt': this.createdAt,
            'updatedAt': this.updatedAt,
            'endDate': this.endDate,
            'start': this.start,
            'occupation': this.occupation,
            'qualifications': this.qualifications,
            'remarks': this.remarks,
            'salary': this.salary,
            'contact': this.contact,
            'isApproved': this.isApproved,
            'hasChanged': this.hasChanged
        };
    }

    fromSimplification(simplification: any): void {
        this.userId = simplification['userId'];
        this.title = simplification['title'];
        this.description = simplification['description'];
        this.createdAt = simplification['createdAt'];
        this.updatedAt = simplification['updatedAt'];
        this.endDate = simplification['endDate'];
        this.start = simplification['start'];
        this.occupation = simplification['occupation'];
        this.qualifications = simplification['qualifications'];
        this.remarks = simplification['remarks'];
        this.salary = simplification['salary'];
        this.contact = simplification['contact'];
        this.isApproved = simplification['isApproved'];
        this.hasChanged = simplification['hasChanged'];
    }
}
