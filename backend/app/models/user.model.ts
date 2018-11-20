import {Column, Model, Table, Unique} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

	// JobItem must have foreign key User
	// @HasMany(() => JobItem)
	// createdJobs!: JobItem[];

	@Column
	company!: string;

	@Unique
	@Column
	username!: string;

	@Column
	password!: string;

	@Column
	email!: string;

	@Column
	token!: string;

	// admin approved this account
	@Column
	isApproved!: boolean;

	toSimplification(): any {
		return {
			'id': this.id,
			'company': this.company,
			'username': this.username,
			'password': this.password,
			'email': this.email,
			'token': this.token,
			'isApproved': this.isApproved
		};
	}

	fromSimplification(simplification: any): void {
		this.email = simplification['email'];
		this.company = simplification['company'];
		this.username = simplification['username'];
		this.password = simplification['password'];
		this.isApproved = simplification['isApproved'];
	}

}
