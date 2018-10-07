import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import {JobItem} from './jobitem.model';

@Table
export class JobList extends Model<JobList> {

	@Column
	name !: string;

	@HasMany(() => JobItem)
	jobitem !: JobItem[];

	toSimplification(): any {
		return {
			'id': this.id,
			'name': this.name
		};
	}

	fromSimplification(simplification: any): void {
		this.name = simplification['name'];
	}

}