import {Column, HasMany, Model, Table, Unique} from 'sequelize-typescript';

@Table
export class UserModel extends Model<UserModel> {

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
			'email': this.email,
			'username': this.username,
			'password': this.password,
			'token': this.token,
			'isApproved': this.isApproved
		};
	}

	fromSimplification(simplification: any): void {
		this.company = simplification['company'];
		this.email = simplification['email'];
		this.username = simplification['username'];
		this.password = simplification['password'];
		this.isApproved = simplification['isApproved'];
	}

}
