# Back-End Job-For-You

## Initial Setup
1. Install [Node.js](https://nodejs.org/en/)
1. `cd` into this backend folder with your shell (note: if you're on Windows, you can for example use [Git Bash](https://git-scm.com/download/win) as a shell)
1. run `npm install` or 'npm update' 
1. To compile the TypeScript code to JavaScript, run `npm run tsc`. After that, this folder should have a `build` folder containing  JavaScript files
1. Run `node build/app/server.js`. The command line output should say something like `Listening at http://localhost:3000/`
1. Test your installation by opening the following endpoints (i.e. "pages") in your browser:
    - [http://localhost:3000/](http://localhost:3000/)

## Explanations
The inline comments in the .ts files should help you understand most of what's going on. Here are a few additional explanations:
- In the backend, the JavaScript code compiled from TypeScript will not be running in a web browser. Instead, we use [Node.js](https://nodejs.org) as our JavaScript runtime.
- We are using the [Express.js](http://expressjs.com/de/) JavaScript web framework to help us with handling requests and providing responses. 
- Whenever you change something, make sure to recompile the TypeScript code (`npm run tsc`) and restart the express application (`node build/server.js`).

## Adding a New Endpoint or Controller
To add a new endpoint that logically belongs to an existing controller, you simply have to add a new route to that controller's Router. 

1. create a new file `<mycontroller>.controller.ts` in the `controllers` folder. Check out our example controllers to see what to do within that file.
1. go to the `controllers/index.ts` file and export your new controller, as described in that `index.ts` file
1. in `server.ts`, mount the new controller analogous to the ones that are already in there (using `app.use(...)`)

## Troubleshooting
- Did you remember to recompile changes? `npm run tsc`
- Lots of changes? `npm update` may help
- Naming issues? permission issues?
- Both service (frontend) and corresponding controller (backend)?
