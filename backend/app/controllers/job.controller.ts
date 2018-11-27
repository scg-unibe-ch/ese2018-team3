import {Request, Response, Router} from 'express';
import {JobModel, UserModel, UserToJobModel} from '../models';
import {Sequelize} from 'sequelize-typescript';
import {UserServices} from '../_services';

const router: Router = Router();

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
            await instance.save();

            const link = new UserToJobModel();
            link.fromSimplification({
                'userId':user.id,
                'jobId': instance.id
            });
            await link.save();

            res.statusCode = 201;
            res.send(instance.toSimplification());
        })


});

router.get('id/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const instance = await JobModel.findById(id);

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

router.get('/user/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await UserModel.findById(userId);

    if (user == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }

    // VERY EXPERIMENTAL
    const instances = await JobModel.findAll({
        include: [{
            model: UserToJobModel,
            required: true,
            where: {
                userId: user.id,
                jobId: Sequelize.col('JobModel.id')
            }
        }]
    });

    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
});

router.get('/company/:company', async (req: Request, res: Response) => {
    const company = parseInt(req.params.company);
    const user = await UserModel.findOne({
        where: {
            company: company
        }
    });

    if (user == null) {
        res.statusCode = 404;
        res.json({
            'message': 'not found'
        });
        return;
    }

    // VERY EXPERIMENTAL
    const instances = await JobModel.findAll({
        include: [{
            model: UserToJobModel,
            required: true,
            where: {
                userId: user.id,
                jobId: Sequelize.col('JobModel.id')
            }
        }]
    });

    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
});

router.put('/:id', async (req: Request, res: Response) => {
    //UserServices.authenticateSameUser(req.headers.authorization)
    const id = parseInt(req.params.id);
    const instance = await JobModel.findById(id);

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

    instance.fromSimplification(req.body);
    await instance.destroy();

    res.statusCode = 204;
    res.send();
});

export const JobController: Router = router;
