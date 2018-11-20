import {Admin, User} from '../models';
import {
	InvalidPasswordError,
	InvalidTokenError,
	UserNotAdminError,
	UserNotApprovedError,
	UserNotFoundError,
	UserNotLoggedInError
} from '../errors';
import {TokenGenerator} from './token-generator';

export class UserServices {

	constructor() {
	}

	/**
	 * Tries to authenticate the specified user as an admin.
	 * @param user the user to be authenticated
	 */
	static async authAdmin(user: any): Promise<Admin> {
		const admin = await Admin.findOne({
			where: {
				userId: user.id
			}
		});

		if (!admin) throw new UserNotAdminError();
		return admin;
	}

	/**
	 * Tries to authenticate the specified user by comparing tokens.
	 * @param user the user to be authenticated
	 */
	static async authenticate(user: any): Promise<User> {
		const u = await User.findById(user.id);

		if (!u) throw new UserNotFoundError();
		if (u.token === null) throw new UserNotLoggedInError();
		if (!(user.token === u.token)) throw new InvalidTokenError();

		return u;
	}

	/**
	 * Tries to authenticate the specified user by comparing passwords.
	 * On successful authentication, a token will be generated for the user.
	 * @param user the user to be logged in
	 */
	static async login(user: any): Promise<User> {
		const u = await User.findOne({
			where: {
				username: user.username
			}
		});

		if (!u) throw new UserNotFoundError();
		if (!(u.password === user.password)) throw new InvalidPasswordError();
		if (!u.isApproved) throw new UserNotApprovedError();

		u.token = TokenGenerator.gen(user.id);
		await u.save();

		return u;
	}

	/**
	 * Tries to logout the specified user. The user's token will be nullified.
	 * @param user the user to be logged out
	 */
	static async logout(user: any): Promise<User> {
		const u = await User.findById(user.id);

		if (!u) throw new UserNotFoundError();
		if (u.token === null) throw new UserNotLoggedInError();

		u.token = '';
		await u.save();

		return u;
	}

	/**
	 * Tries to update the specified user's information in the database.
	 * @param user the user to be updated
	 */
	static async updateUser(user: any): Promise<User> {
		const u = await User.findOne({
			where: {
				username: user.username
			}
		});

		if (!u) throw new UserNotFoundError();

		u.fromSimplification(user);
		await u.save();
		return u;
	}

	/**
	 * Tries to register the specified user into the database.
	 * @param user the user to be registered
	 */
	static async register(user: any): Promise<User> {
		const u = new User();
		u.fromSimplification({
			'company': user.company,
			'username': user.username,
			'password': user.password,
			'isApproved': false
		});

		await u.save();
		return u;
	}
}