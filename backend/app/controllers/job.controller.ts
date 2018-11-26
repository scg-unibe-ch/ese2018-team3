import {Request, Response, Router} from 'express';
import {JobModel, UserModel, UserToJobModel} from '../models';
import {Sequelize} from 'sequelize-typescript';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const instances = await JobModel.findAll();

    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
});

router.post('/', async (req: Request, res: Response) => {
    const instance = new JobModel();
    instance.fromSimplification(req.body);
    await instance.save();

    const link = new UserToJobModel();
    link.fromSimplification({
        'userId': req.body.user.id,
        'jobId': instance.id
    });
    await link.save();

    res.statusCode = 201;
    res.send(instance.toSimplification());
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
    const q_userId = parseInt(req.params.id);
    const user = await UserModel.findById(q_userId);

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
                userId: q_userId,
                jobId: Sequelize.col('JobModel.id')
            }
        }]
    });

    res.statusCode = 200;
    res.send(instances.map(e => e.toSimplification()));
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
