
import { Router, Request, Response } from 'express';
// TODO: need to import body parser?

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    // TODO: want to respond with some random weather data
    // generate some random weather data
    var temperature = Math.floor(Math.random() * 35);
    var humidity = Math.round(Math.random() * 100);

    // put data into a response payload
    var res_payload = {
        "tmp_celsius": temperature,
        "rel_humidity_percent": humidity,
        "timestamp": Date.now()
    };
    res.statusCode = 200;
    res.json(res_payload);
});

export const WeatherController: Router = router;