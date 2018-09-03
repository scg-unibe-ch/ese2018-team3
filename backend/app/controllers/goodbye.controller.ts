/* app/controllers/goodbye.controller.ts */

// Import only what we need from express
import { Router, Request, Response } from 'express';

// Assign router to the express.Router() instance
const router: Router = Router();

// The / here corresponds to the route that the GoodbyeController
// is mounted on in the server.ts file.
// In this case it's /goodbye
router.get('/', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    res.send('Goodbye, World!');
});

router.get('/:name', (req: Request, res: Response) => {
    // Extract the name from the request parameters
    let { name } = req.params;

    // Greet the given name
    res.send(`Goodbye, ${name}`);
});

// Export the express.Router() instance to be used by server.ts
export const GoodbyeController: Router = router;
