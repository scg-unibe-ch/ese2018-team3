import {Request, Response, Router} from 'express';
import {User} from '../models';
import {UserServices} from '../_services';
import {UserNotAdminError, UserNotFoundError} from '../errors';

const router: Router = Router();

function genLog(): string {
	return new Date().toLocaleTimeString() + '\tusers: ';
}

router.post('/', async (req: Request, res: Response) => {
	const instance = new User();
	instance.fromSimplification(req.body);
	await instance.save();

	res.statusCode = 201;
	res.send(instance.toSimplification());
});

router.get('/', async (req: Request, res: Response) => {
	console.log(genLog() + 'Finding all users...');
	const instances = await User.findAll();

	res.statusCode = 200;
	res.send(instances.map(e => e.toSimplification()));
});

router.get('/id/:id', async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	const instance = await User.findById(id);

	if (instance == null) {
		res.statusCode = 404;
		res.json({
			'message': 'not found'
		});
		return;
	}

	res.statusCode = 200;
	res.send(instance.toSimplification());
});

router.get('/unapproved', async (req: Request, res: Response) => {
	const instances = await User.findAll({
		where: {
			isApproved: false
		}
	});

	res.statusCode = 200;
	res.send(instances.map(u => u.toSimplification()));
});

router.get('/username/:username', async (req: Request, res: Response) => {
	const instance = await User.findOne({
		where: {
			username: req.params.username
		}
	});

	if (instance == null) {
		res.statusCode = 404;
		res.json({
			'message': 'not found'
		});
		return;
	}

	res.statusCode = 200;
	res.send(instance.toSimplification());
});

router.put('/id/:id', async (req: Request, res: Response) => {
	UserServices.authAdmin(req.body)
		.catch(err => {
			const lg = genLog() + 'update: ';
			switch (err.name) {
				case UserNotAdminError.name:
					console.log(lg + 'user not admin: \'' + req.body.username + '\'');
					res.statusCode = 401;
					res.json({'message': 'unauthorized'});
					return;

				default:
					console.log(lg + err);
					res.statusCode = 400;
					res.json({'message': 'bad request'});
					return;
			}
		})
		.then(async () => {
			const id = parseInt(req.params.id);
			const instance = await User.findById(id);

			if (instance == null) {
				res.statusCode = 404;
				res.json({
					'message': 'not found'
				});
				return;
			}

			instance.fromSimplification(req.body);
			await instance.save();

			res.statusCode = 200;
			res.send(instance.toSimplification());
		});
});

router.put('/username/:username', async (req: Request, res: Response) => {
	UserServices.authAdmin(req.body)
		.catch(err => {
			const lg = genLog() + 'update: ';
			switch (err.name) {
				case UserNotAdminError.name:
					console.log(lg + 'user not admin: \'' + req.body.username + '\'');
					res.statusCode = 401;
					res.json({'message': 'unauthorized'});
					return;

				default:
					console.log(lg + err);
					res.statusCode = 400;
					res.json({'message': 'bad request'});
					return;
			}
		})
		.then(async () => {
			const instance = await User.findOne(req.params.username);

			if (instance == null) {
				res.statusCode = 404;
				res.json({
					'message': 'not found'
				});
				return;
			}

			instance.fromSimplification(req.body);
			await instance.save();

			res.statusCode = 200;
			res.send(instance.toSimplification());
		});
});

router.post('/delete/id/:id', async (req: Request, res: Response) => {
	UserServices.authAdmin(req.body)
		.then(async () => {
			const id = parseInt(req.params.id);
			const instance = await User.findById(id);

			if (instance == null) {
				res.statusCode = 404;
				res.json({
					'message': 'not found'
				});
				return;
			}

			instance.fromSimplification(req.body);
			await instance.destroy();

			res.statusCode = 204;
			res.send();
		})
		.catch(err => {
			const lg = genLog() + 'update: ';
			switch (err.name) {
				case UserNotAdminError.name:
					console.log(lg + 'user not admin: \'' + req.body.username + '\'');
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

export const UserController: Router = router;
