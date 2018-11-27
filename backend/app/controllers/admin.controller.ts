import {Request, Response, Router} from 'express';
import {AdminModel} from '../models';
import {UserServices} from '../_services';
import {UserUnauthorizedError} from '../errors';

const router: Router = Router();

function genLog(): string {
    return new Date().toLocaleTimeString() + '\tadmin: ';
}

router.post('/', async (req: Request, res: Response) => {
    UserServices.authenticate(req.headers.authorization, true)
        .then(async () => {
            const instance = new AdminModel();
            instance.fromSimplification(req.body);
            await instance.save();

            res.statusCode = 201;
            res.send(instance.toSimplification());
        })
        .catch(err => {
            const lg = genLog() + 'update: ';
            switch (err.name) {
                case UserUnauthorizedError.name:
                    console.log(lg + 'user unauthorized: \'' + req.body.username + '\'');
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

router.get('/auth', async (req: Request, res: Response) => {
    console.log(genLog() + 'authenticating as admin...');
    UserServices.authenticate(req.headers.authorization, true)
        .then(async () => {
            console.log(genLog() + 'Successfully authenticated as admin');
            res.statusCode = 200;
        })
        .catch(err => {
            const lg = genLog() + 'update: ';
            switch (err.name) {
                case UserUnauthorizedError.name:
                    console.log(lg + 'user unauthorized: \'' + req.body.username + '\'');
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

router.get('/', async (req: Request, res: Response) => {
    const instances = await AdminModel.findAll();

    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
});

router.get('/id/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const instance = await AdminModel.findById(id);

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
    const instance = await AdminModel.findOne({
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
    UserServices.authenticate(req.headers.authorization, true)
        .then(async () => {
            const id = parseInt(req.params.id);
            const instance = await AdminModel.findById(id);

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
        })
        .catch(err => {
            const lg = genLog() + 'update: ';
            switch (err.name) {
                case UserUnauthorizedError.name:
                    console.log(lg + 'user unauthorized: \'' + req.body.username + '\'');
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

router.put('/user-id/:id', async (req: Request, res: Response) => {
    UserServices.authenticate(req.headers.authorization, true)
        .then(async () => {
            const id = parseInt(req.params.id);
            const instance = await AdminModel.findOne({
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
        })
        .catch(err => {
            const lg = genLog() + 'update: ';
            switch (err.name) {
                case UserUnauthorizedError.name:
                    console.log(lg + 'user unauthorized: \'' + req.body.username + '\'');
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

router.delete('/:id', async (req: Request, res: Response) => {
    UserServices.authenticate(req.headers.authorization, true)
        .then(async () => {
            const id = parseInt(req.params.id);
            const instance = await AdminModel.findById(id);

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
                case UserUnauthorizedError.name:
                    console.log(lg + 'user unauthorized: \'' + req.body.username + '\'');
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

export const AdminController: Router = router;
