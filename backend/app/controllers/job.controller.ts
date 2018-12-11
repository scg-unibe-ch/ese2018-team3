import {Request, Response, Router} from 'express';
import {JobModel, UserModel} from '../models';
import {UserServices} from '../_services';
import {InvalidTokenError, UserNotFoundError, UserNotLoggedInError, UserUnauthorizedError} from '../errors';
import {Sequelize} from 'sequelize-typescript';

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
            const lg = genLog() + 'auth (post): ';
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

router.post('/search', async (req: Request, res: Response) => {
    function like(s: string | undefined) {
        if (!s) return '%';
        return '%' + s + '%';
    }
    
    const query = req.body;

    const Op = Sequelize.Op;
    const instances = await JobModel.findAll({
        where: {
            [Op.or]: [{
                title: {
                    [Op.like]: like(query.title)
                },
                description: {
                    [Op.like]: like(query.description)
                },
                occupation: {
                    [Op.like]: like(query.occupation)
                },
                qualifications: {
                    [Op.like]: like(query.qualifications)
                },
                remarks: {
                    [Op.like]: like(query.remarks)
                },
                salary: {
                    [Op.like]: like(query.salary)
                },
                contact: {
                    [Op.like]: like(query.contact)
                }
            }]
        }
    });

    res.statusCode = 200;
    res.send(instances.map(e => e.id));
});

router.get('/search/:title', async (req: Request, res: Response) => {
    const Op = Sequelize.Op;
    const title = req.params.title ? req.params.title : '';
    const instances = await JobModel.findAll({
        where: {
            title: {
                [Op.like] : '%' + req.params.title + '%'
            }
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
            const lg = genLog() + 'auth (current-user): ';
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

router.get('/unapproved', async (req: Request, res: Response) => {
    UserServices.authenticate(req.headers.authorization, true)
        .then(async user => {
            const instances = await JobModel.findAll({
                where: {
                    isApproved: false
                }
            });

            res.statusCode = 200;
            res.send(instances.map(e => e.toSimplification()));
        })
        .catch(err => {
            const lg = genLog() + 'auth (unapproved): ';
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

                case UserUnauthorizedError.name:
                    console.log(lg + 'user unauthorized: \'' + req.body.username + '\'');
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
            const lg = genLog() + 'auth (put): ';
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
            const lg = genLog() + 'auth (delete): ';
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
