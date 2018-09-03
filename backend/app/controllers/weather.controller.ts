/*
 * See welcome.controller.ts for a more in-depth explanation on what controllers are and how we should use them.
 */

// import the types we need from express
import { Router, Request, Response } from 'express';

// instantiate a Router for this controller. The Router is responsible for defining all routes at or below this
// controller's root. Since the server binds this controller's root to /weather (see server.ts), this router instance
// can define endpoints at addresses like /weather, /weather/local, /weather/bern/today, etc. (note that we don't have
// to specify /weather in our endpoints here, since that's done by server.ts).
const router: Router = Router();

// add an **endpoint** to this controller's router, at its root (in the server, we define this controller's
// root to be /weather, therefore this "/" endpoint will be bound to /weather
router.get('/', (req: Request, res: Response) => {
    // generate some random weather data
    var temperature = Math.floor(Math.random() * 35);
    var humidity = Math.round(Math.random() * 100);

    // put the data into a response object
    var resPayload = {
        "tmp_celsius": temperature,
        "rel_humidity_percent": humidity,
        "timestamp": Date.now()
    };

    // specify the HTTP status code (see https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
    res.statusCode = 200;

    // respond to the request with the JSON payload we just created
    res.json(resPayload);
});

// export this controller's router as WeatherController, with type Router
export const WeatherController: Router = router;