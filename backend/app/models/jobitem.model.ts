import {Table, Column, Model, HasMany, BelongsTo, ForeignKey, CreatedAt} from 'sequelize-typescript';
import {JobList} from './joblist.model';

@Table
export class JobItem extends Model<JobItem> {

	@Column
	name!: string;

	@Column
	description!: string;

	@CreatedAt
	@Column
	createdAt!: Date;

	@Column
	endDate!: Date;

	@Column
	qualifications!: string;

	@ForeignKey(() => JobList)
	@Column
	jobListId!: number;

	@BelongsTo(() => JobList)
	jobList!: JobList;

	toSimplification(): any {
		return {
			'id': this.id,
			'name': this.name,
			'description': this.description,
			'createdAt': this.createdAt,
			'endDate': this.endDate,
			'qualifications': this.qualifications
		};
	}

	fromSimplification(simplification: any): void {
		this.jobListId = simplification['jobListId'];
		this.name = simplification['name'];
		this.description = simplification['description'];
		this.createdAt = simplification['createdAt'];
		this.endDate = simplification['endDate'];
		this.qualifications = simplification['qualifications'];
	}

}
