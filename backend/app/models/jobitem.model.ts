import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {JobList} from './joblist.model';

@Table
export class JobItem extends Model<JobItem> {

	@Column
	name!: string;
	description!: string;
	dateCreated!: Date;
	endDate!: Date;
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
			'dateCreated': this.dateCreated,
			'endDate': this.endDate,
			'qualifications': this.qualifications
		};
	}

	fromSimplification(simplification: any): void {
		this.jobListId = simplification['jobListId'];
		this.name = simplification['name'];
		this.description = simplification['description'];
		this.dateCreated = simplification['dateCreated'];
		this.endDate = simplification['endDate'];
		this.qualifications = simplification['qualifications'];
	}

}
