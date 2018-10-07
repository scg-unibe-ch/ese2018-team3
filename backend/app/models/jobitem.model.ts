import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {JobList} from './joblist.model';

@Table
export class JobItem extends Model<JobItem> {

	@Column
	name!: string;
	description!: string;

	@Column
	done!: boolean;

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
			'done': this.done
		};
	}

	fromSimplification(simplification: any): void {
		this.name = simplification['name'];
		this.description = simplification['description'];
		this.done = simplification['done'];
		this.jobListId = simplification['jobListId'];
	}

}
