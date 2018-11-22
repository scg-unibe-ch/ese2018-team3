import {Request, Response, Router} from 'express';
import {UserModel} from '../models';
import {UserServices} from '../_services';
import {UserNotAdminError} from '../errors';

const router: Router = Router();

function genLog(): string {
    return new Date().toLocaleTimeString() + '\tusers: ';
}

router.post('/', async (req: Request, res: Response) => {
    const instance = new UserModel();
    instance.fromSimplification(req.body);
    await instance.save();

    res.statusCode = 201;
    res.send(instance.toSimplification());
});

router.get('/', async (req: Request, res: Response) => {
    console.log(genLog() + 'Finding all users...');
    const instances = await UserModel.findAll();

    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
});

router.get('/id/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const instance = await UserModel.findById(id);

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
    const instances = await UserModel.findAll({
        where: {
            isApproved: false
        }
    });

    res.statusCode = 200;
    res.send(instances.map(u => u.toSimplification()));
});

router.get('/username/:username', async (req: Request, res: Response) => {
    const instance = await UserModel.findOne({
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
    UserServices.authenticate(req.headers.authorization, true)
        .then(async () => {
            const id = parseInt(req.params.id);
            const instance = await UserModel.findById(id);

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

router.put('/username/:username', async (req: Request, res: Response) => {
    UserServices.authenticate(req.headers.authorization, true)
        .then(async () => {
            const instance = await UserModel.findOne(req.params.username);

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

router.put('/approve/id/:id', async (req: Request, res: Response) => {
    UserServices.authenticate(req.headers.authorization, true)
        .then(async () => {
            const id = parseInt(req.params.id);
            const instance = await UserModel.findById(id);

            if (instance == null) {
                res.statusCode = 404;
                res.json({
                    'message': 'not found'
                });
                return;
            }

            instance.isApproved = req.body.approval;
            await instance.save();

            res.statusCode = 200;
            res.send(instance.toSimplification());
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

router.put('/approve/username/:username', async (req: Request, res: Response) => {
    UserServices.authenticate(req.headers.authorization, true)
        .then(async () => {
            const instance = await UserModel.findOne({
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

            instance.isApproved = req.body.approval;
            await instance.save();

            res.statusCode = 200;
            res.send(instance.toSimplification());
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

router.delete('/id/:id', async (req: Request, res: Response) => {
    UserServices.authenticate(req.headers.authorization, true)
        .then(async () => {
            const id = parseInt(req.params.id);
            const instance = await UserModel.findById(id);

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

router.delete('/username/:username', async (req: Request, res: Response) => {
    UserServices.authenticate(req.headers.authorization, true)
        .then(async () => {
            const instance = await UserModel.findOne({
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
