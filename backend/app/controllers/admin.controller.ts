import {Request, Response, Router} from 'express';
import {Admin} from '../models';
import {UserServices} from '../_services';
import {UserNotAdminError} from '../errors';

const router: Router = Router();

function genLog(): string {
	return new Date().toLocaleTimeString() + '\tadmin: ';
}

router.post('/', async (req: Request, res: Response) => {
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
			const instance = new Admin();
			instance.fromSimplification(req.body);
			await instance.save();

			res.statusCode = 201;
			res.send(instance.toSimplification());
		});
});

router.get('/', async (req: Request, res: Response) => {
	const instances = await Admin.findAll();

	res.statusCode = 200;
	res.send(instances.map(e => e.toSimplification()));
});

router.get('/id/:id', async (req: Request, res: Response) => {
	const id = parseInt(req.params.id);
	const instance = await Admin.findById(id);

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

router.get('/user-id/:userId', async (req: Request, res: Response) => {
	const id = parseInt(req.params.userId);
	const instance = await Admin.findOne({
		where: {
			userId: id
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

router.put('/:id', async (req: Request, res: Response) => {
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
			const instance = await Admin.findById(id);

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

router.put('/user-id/:id', async (req: Request, res: Response) => {
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
			const instance = await Admin.findOne({
				where: {
					userId: id
				}
			});

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

router.delete('/:id', async (req: Request, res: Response) => {
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
			const instance = await Admin.findById(id);

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
		});
});

export const AdminController: Router = router;
