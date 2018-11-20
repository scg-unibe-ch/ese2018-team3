import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from './';

@Table
export class Admin extends Model<Admin> {

	@ForeignKey(() => User)
	@Column
	userId!: number;

	toSimplification(): any {
		return {
			'id': this.id,
			'userId': this.userId,
		};
	}

	fromSimplification(simplification: any): void {
		this.userId = simplification['userId'];
	}
}
