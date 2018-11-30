import {AdminModel, UserModel} from '../models';
import {
    InvalidPasswordError,
    InvalidTokenError,
    UserNotApprovedError,
    UserNotFoundError, UserUnauthorizedError,
} from '../errors';
import jwt from 'jwt-simple';
import moment from 'moment';


export class UserServices {

	private static TOKEN_SECRET: string = '%Bw[HNtju_lo:N{o&mKEcKc\"Qf5d1NH$w$EWz>UY;aS&$-wnNXx1&zqTVE8tWR&';

	constructor() {}

	static async authAdmin(auth_header: string | undefined) {
        if (!auth_header) throw Error.prototype;
        // Ommit leading 'Bearer'
        const tok = auth_header.split(" ")[1];

        const payload = jwt.decode(tok, this.TOKEN_SECRET);
        const now = moment().unix();
        if (now > payload.exp) throw new InvalidTokenError();

        const userId = payload.sub;
        const admin = await AdminModel.findOne({
			where: {
				userId: userId
			}
        });
        if (!admin) throw new UserUnauthorizedError();
		return admin;
	}

    /**
     * Tries to authenticate the specified user by comparing tokens.
     * @param auth_header the token to be authenticated
     * @param asAdmin if the token should be validated as admin
     */
	static async authenticate(auth_header: string | undefined, asAdmin: boolean = false): Promise<UserModel> {
		if (!auth_header) throw Error.prototype;
		// Ommit leading 'Bearer'
		const tok = auth_header.split(" ")[1];

        const payload = jwt.decode(tok, this.TOKEN_SECRET);
        const now = moment().unix();
        if (now > payload.exp) throw new InvalidTokenError();

        const userId = payload.sub;

		if (asAdmin) {
            const admin = await AdminModel.findOne({
                where: {
                    userId: userId
                }
            });
            if (!admin) throw new UserUnauthorizedError();
		}

		const u = await UserModel.findById(userId);
		if (!u) throw new UserNotFoundError();
		if (u.token != tok) throw new InvalidTokenError();

		return u;
	}

	static async authenticateSameUser(auth_header: string | undefined, id: number): Promise<UserModel> {
        if (!auth_header) throw Error.prototype;
        // Ommit leading 'Bearer'
        const tok = auth_header.split(" ")[1];

        const payload = jwt.decode(tok, this.TOKEN_SECRET);
        const now = moment().unix();
        if (now > payload.exp) throw new InvalidTokenError();

        const userId = payload.sub;
        const u = await UserModel.findById(id);
        if (!u) throw new UserNotFoundError();

        const admin = await AdminModel.findOne({
            where: {
                userId: userId
            }
        });

        if (admin) return u;
        else if (userId !== id) throw new UserUnauthorizedError();
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
			exp: moment().add(30, 'm').unix(),	// expires on
			sub: u.id				// subject
		};

		u.token = jwt.encode(payload, this.TOKEN_SECRET);
		await u.save();

		return u;
	}

	/**
	 * Tries to logout the specified user. The user's token will be nullified.
	 * @param auth_header the user to be logged out
	 */
	static async logout(auth_header: string): Promise<UserModel> {
		// Ommit leading 'Bearer'
        const tok = auth_header.split(" ")[1];

        const payload = jwt.decode(tok, this.TOKEN_SECRET);
        const userId = payload.sub;

		const u = await UserModel.findById(userId);
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