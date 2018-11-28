import {Request, Response, Router} from 'express';
import {UserServices} from '../_services';
import {
	InvalidPasswordError,
	InvalidTokenError,
	UserNotApprovedError,
	UserNotFoundError,
	UserNotLoggedInError
} from '../errors';

const router: Router = Router();

function genLog(): string {
	return new Date().toLocaleTimeString() + '\tuser-service: ';
}

router.post('/auth', async (req: Request, res: Response) => {
	UserServices.authenticate(req.headers.authorization)
		.then(user => {
			console.log(genLog() + 'Successfully authenticated\'' + user.username + '\'');
			res.statusCode = 204;   // no content
			return;
		})
		.catch(err => {
			const lg = genLog() + 'auth: ';
			switch (err.name) {
				case UserNotFoundError.name:
					console.log(lg + 'user not found: \'' + req.body.username + '\'');
					res.statusCode = 404;
					res.json({'message': 'not found'});
					return;

				case UserNotLoggedInError.name:
					console.log(lg + 'user not logged in: \'' + req.body.username + '\'');
					res.statusCode = 401;
					res.json({'message': 'unauthorized'});
					return;

				case InvalidTokenError.name:
					console.log(lg + 'invalid token: \'' + req.body.username + '\'');
					res.statusCode = 401;
					res.json({'message': 'unauthorized'});
					return;

				default:
					console.log(lg + err);
					res.statusCode = 400;
					res.json({'message': 'bad request'});
					return;
			}
		});
});

router.post('/login', async (req: Request, res: Response) => {
	console.log(genLog() + 'Logging in \'' + req.body.username + '\'...');
	UserServices.login(req.body)
		.then(async user => {
			console.log(genLog() + 'Successfully logged in \'' + req.body.username + '\'');
			res.statusCode = 200;
			res.send(user.toSimplification());
		})
		.catch(err => {
			const lg = genLog() + 'login: ';
			switch (err.name) {
				case UserNotFoundError.name:
					console.log(lg + 'user not found: \'' + req.body.username + '\'');
					res.statusCode = 404;
					res.json({'message': 'user not found'});
					return;

				case InvalidPasswordError.name:
					console.log(lg + 'invalid password for: \'' + req.body.username + '\'');
					res.statusCode = 401;
					res.json({'message': 'wrong password'});
					return;

				case UserNotApprovedError.name:
					console.log(lg + 'user not approved: \'' + req.body.username + '\'');
					res.statusCode = 403;
					res.json({'message': 'not yet approved'});
					return;

				default:
					console.log(lg + err);
					res.statusCode = 400;
					res.json({'message': 'bad request'});
					return;
			}
		});
});

router.post('/logout', async (req: Request, res: Response) => {
	if (!req.headers.authorization) {
		res.statusCode = 400;
		res.json({'message': 'no authorization token'});
		return;
    }

	UserServices.logout(req.headers.authorization)
		.then(async user => {
			console.log('user-service\t' + 'Successfully logged out \'' + req.body.username + '\'');
			res.statusCode = 200;
			res.send(user.toSimplification());
		})
		.catch(err => {
			const lg = genLog() + 'logout: ';
			switch (err.name) {
				case UserNotFoundError.name:
					console.log(lg + 'user not found: \'' + req.body.username + '\'');
					res.statusCode = 404;
					res.json({'message': 'not found'});
					return;

				default:
					console.log(lg + err);
					res.statusCode = 400;
					res.json({'message': 'bad request'});
					return;
			}
		});
});

router.post('/register', async (req: Request, res: Response) => {
	console.log(genLog() + 'Registering \'' + req.body.username + '\'...');

	UserServices.register(req.body)
		.then(newUser => {
			console.log(genLog() + 'Successfully registered \'' + req.body.username + '\'');
			res.statusCode = 200;
			res.send(newUser);
		})
		.catch(() => {
			console.log(genLog() + 'Failure while registering \'' + req.body.username + '\' : username already taken');

			res.statusCode = 405;
			res.json({
				'message': 'method not allowed'
			});
			return;
		});
});

router.put('update-user', async (req: Request, res: Response) => {
    UserServices.authenticate(req.headers.authorization)
		.then(() => {
            UserServices.updateUser(req.body)
                .then(user => {
                    console.log('user-service\t' + 'Successfully updated \'' + req.body.username + '\'');
                    res.statusCode = 200;
                    res.send(user.toSimplification());
                })
                .catch(err => {
                    const lg = genLog() + 'update: ';
                    switch (err.name) {
                        case UserNotFoundError.name:
                            console.log(lg + 'user not found: \'' + req.body.username + '\'');
                            res.statusCode = 404;
                            res.json({'message': 'not found'});
                            return;

                        default:
                            console.log(lg + err);
                            res.statusCode = 400;
                            res.json({'message': 'bad request'});
                            return;
                    }
                });
		})
        .catch(err => {
            const lg = genLog() + 'auth: ';
            switch (err.name) {
                case UserNotFoundError.name:
                    console.log(lg + 'user not found: \'' + req.body.username + '\'');
                    res.statusCode = 404;
                    res.json({'message': 'not found'});
                    return;

                case UserNotLoggedInError.name:
                    console.log(lg + 'user not logged in: \'' + req.body.username + '\'');
                    res.statusCode = 401;
                    res.json({'message': 'unauthorized'});
                    return;

                case InvalidTokenError.name:
                    console.log(lg + 'invalid token: \'' + req.body.username + '\'');
                    res.statusCode = 401;
                    res.json({'message': 'unauthorized'});
                    return;

                default:
                    console.log(lg + err);
                    res.statusCode = 400;
                    res.json({'message': 'bad request'});
                    return;
            }
        });
});

export const UserServicesController: Router = router;
