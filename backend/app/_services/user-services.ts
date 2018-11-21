import {AdminModel, UserModel} from '../models';
import {
	InvalidPasswordError,
	InvalidTokenError,
	UserNotAdminError,
	UserNotApprovedError,
	UserNotFoundError,
	UserNotLoggedInError
} from '../errors';
import jwt from 'jwt-simple';
import moment from 'moment';
import {TokenExpiredError} from '../errors/TokenExpiredError';


export class UserServices {

	private static TOKEN_SECRET: string = '%Bw[HNtju_lo:N{o&mKEcKc\"Qf5d1NH$w$EWz>UY;aS&$-wnNXx1&zqTVE8tWR&';
	private static EXPIRES_IN: number = 30;
	private static EXPIRES_TYPE: string = 'minutes';

	constructor() {
	}

	/**
	 * Tries to authenticate the specified user as an admin.
	 * @param user the user to be authenticated
	 */
	static async authAdmin(user: any): Promise<AdminModel> {
		const admin = await AdminModel.findOne({
			where: {
				userId: user.id
			}
		});

		if (!admin) throw new UserNotAdminError();
		return admin;
	}

    /**
     * Tries to authenticate the specified user by comparing tokens.
     * @param token the token to be authenticated
     * @param asAdmin if the token should be validated as admin
     */
	static async authenticate(token: string, asAdmin: boolean = false): Promise<UserModel> {
        const payload = jwt.decode(token, this.TOKEN_SECRET);
        const userId = payload.sub;
        const future = moment(payload.iat).add(30, 'minutes').unix();
        const now = moment().unix();

        if (now > future) throw new TokenExpiredError();

		if (asAdmin) {
            const admin = await AdminModel.findOne({
                where: {
                    userId: userId
                }
            });
            if (!admin) throw new UserNotAdminError();
		}

		const u = await UserModel.findById(userId);
		if (!u) throw new UserNotFoundError();
		if (u.token != token) throw new InvalidTokenError();

		return u;
	}

	/**
	 * Tries to authenticate the specified user by comparing passwords.
	 * On successful authentication, a token will be generated for the user.
	 * @param user the user to be logged in
	 */
	static async login(user: any): Promise<UserModel> {
		const u = await UserModel.findOne({
			where: {
				username: user.username
			}
		});

		if (!u) throw new UserNotFoundError();
		if (!(u.password === user.password)) throw new InvalidPasswordError();
		if (!u.isApproved) throw new UserNotApprovedError();

		const payload = {
			iat: moment().unix(),	// issued at
			sub: u.id				// subject
		};

		u.token = jwt.encode(payload, this.TOKEN_SECRET);
		await u.save();

		return u;
	}

	/**
	 * Tries to logout the specified user. The user's token will be nullified.
	 * @param user the user to be logged out
	 */
	static async logout(user: any): Promise<UserModel> {
		const u = await UserModel.findById(user.id);

		if (!u) throw new UserNotFoundError();

		u.token = '';
		await u.save();

		return u;
	}

	/**
	 * Tries to update the specified user's information in the database.
	 * @param user the user to be updated
	 */
	static async updateUser(user: any): Promise<UserModel> {
		const u = await UserModel.findOne({
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
	static async register(user: any): Promise<UserModel> {
		const u = new UserModel();
		u.fromSimplification({
			'company': user.company,
			'email': user.email,
			'username': user.username,
			'password': user.password,
			'isApproved': false
		});

		await u.save();
		return u;
	}
}