import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', function (req: Request, res: Response) {
    res.send("This is the weather channel");
});

export const WeatherController: Router = router;