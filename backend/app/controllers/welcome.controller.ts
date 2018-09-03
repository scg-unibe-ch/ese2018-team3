/*
 * Controllers are used to group together all the endpoints that logically belong together. In general, you want to
 * group together all the endpoints for a single "resource" within your API, for example "User". In that case, you
 * would create a user.controller.ts, which defines all the user-related endpoints, such as user creation and deletion,
 * updating user information, etc.
 *
 * In this file, we have a controller for all the "welcoming operations". It defines an endpoint for a generic
 * greeting, and another one that can greet users by name, if they add a name to the request. If we were to add some
 * further "welcoming operations", such as welcoming the user with a random meme, this controller would be the right
 * place to define that endpoint. Since server.ts binds this controller to /welcome, such an endpoint might look
 * something like /welcome/meme.
 *
 * However, if we were to add some non-welcoming-related operations, such as login, product overview,
 * account-related operations, etc., the WelcomeController would not be an appropriate place for them. In that case, we
 * either already have different controllers where these endpoints would make sense respectively, or we would have to
 * add new ones.
 */

// import the types we need from express
import { Router, Request, Response } from 'express';

// instantiate a Router for this controller. The Router is responsible for defining all routes at or below this
// controller's root. Since the server.ts binds this controller's root to /welcome (see server.ts), this router
// instance can define endpoints at addresses like /welcome, /welcome/<some name>, /welcome/english/us, etc. (note that
// we don't have to specify /welcome in our endpoints here, since that's done by server.ts).
const router: Router = Router();

// add an **endpoint** to this controller's router, at its root (in the server, we define this controller's
// root to be /welcome, therefore this "/" endpoint will be bound to /welcome
router.get('/', (req: Request, res: Response) => {
    // reply with a hello world text response
    res.send('Hello, World!');
});

// add another **endpoint**, but define a placeholder for a path parameter, which we'll call "name". This endpoint
// will be bound to /welcome/<someName> (again, the /welcome route is defined by server.ts, we just add /:name in this
// controller)
router.get('/:name', (req: Request, res: Response) => {
    // extract the name from the path parameters
    let { name } = req.params;

    // greet the given name
    res.send(`Hello, ${name}`);
});

// export this controller's router as WelcomeController, with type Router
export const WelcomeController: Router = router;
