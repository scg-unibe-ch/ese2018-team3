import {Column, CreatedAt, Model, Table, UpdatedAt} from 'sequelize-typescript';

@Table
export class JobModel extends Model<JobModel> {

    @Column
    name!: string;

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

    toSimplification(): any {
        return {
            'id': this.id,
            'name': this.name,
            'description': this.description,
            'createdAt': this.createdAt,
            'updatedAt': this.updatedAt,
            'endDate': this.endDate,
            'qualifications': this.qualifications
        };
    }

    fromSimplification(simplification: any): void {
        this.name = simplification['name'];
        this.description = simplification['description'];
        this.createdAt = simplification['createdAt'];
        this.updatedAt = simplification['updatedAt'];
        this.endDate = simplification['endDate'];
        this.qualifications = simplification['qualifications'];
    }
}
