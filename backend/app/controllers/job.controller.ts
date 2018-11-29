import {Request, Response, Router} from 'express';
import {JobModel, UserModel} from '../models';
import {UserServices} from '../_services';
import {InvalidTokenError, UserNotFoundError, UserNotLoggedInError} from '../errors';

const router: Router = Router();

function genLog(): string {
    return new Date().toLocaleTimeString() + '\tjobs: ';
}

router.get('/', async (req: Request, res: Response) => {
    const instances = await JobModel.findAll();

    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
});

router.post('/', async (req: Request, res: Response) => {
    UserServices.authenticate(req.headers.authorization)
        .then(async user => {
            const instance = new JobModel();

            instance.fromSimplification(req.body);
            instance.isApproved = false;
            instance.hasChanged = false;
            instance.userId = user.id;
            await instance.save();

            res.statusCode = 201;
            res.send(instance.toSimplification());
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

router.get('/id/:id', async (req: Request, res: Response) => {
    console.log(genLog() + `retrieving ${req.params.id}`);
    const id = parseInt(req.params.id);
    const instance = await JobModel.findById(id);

    if (instance == null) {
        console.log(genLog() + `${req.params.id} not found`);
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }

    res.statusCode = 200;
    res.send(instance.toSimplification());
});

router.get('/user/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await UserModel.findById(id);

    if (user == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }

    const instances = await JobModel.findAll({
        where: {
            userId: id
        }
    });

    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
});

router.get('/company/:company', async (req: Request, res: Response) => {
    const company = parseInt(req.params.company);
    const users = await UserModel.findAll({
        where: {
            company: company
        }
    });

    const instances = await JobModel.findAll({
        where: {
            userId: users.map(e => e.id)
        }
    });

    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
});

router.get('/current-user', async (req: Request, res: Response) => {
    UserServices.authenticate(req.headers.authorization)
        .then(async user => {
            const instances = await JobModel.findAll({
                where: {
                    userId: user.id
                }
            });

            res.statusCode = 200;
            res.send(instances.map(e => e.toSimplification()));
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

router.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const instance = await JobModel.findById(id);

    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }

    UserServices.authenticateSameUser(req.headers.authorization, instance.userId)
        .then(async () => {
            instance.fromSimplification(req.body);
            instance.hasChanged = true;
            await instance.save();

            res.statusCode = 200;
            res.send(instance.toSimplification());
        })
        .catch(err => {
            const lg = genLog() + 'auth: ';
            switch (err.name) {
                case UserNotFoundError.name:
                    console.log(lg + 'user not found: \'' + req.body.username + '\'');
                    res.statusCode = 404;
                    res.json({'message': 'not found'});
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

router.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const instance = await JobModel.findById(id);

    if (instance == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }

    UserServices.authenticateSameUser(req.headers.authorization, instance.userId)
        .then(async () => {
            instance.fromSimplification(req.body);
            await instance.destroy();

            res.statusCode = 204;
            res.send();
        })
        .catch(err => {
            const lg = genLog() + 'auth: ';
            switch (err.name) {
                case UserNotFoundError.name:
                    console.log(lg + 'user not found: \'' + req.body.username + '\'');
                    res.statusCode = 404;
                    res.json({'message': 'not found'});
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

export const JobController: Router = router;
