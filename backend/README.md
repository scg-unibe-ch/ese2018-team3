# Back-End Scaffolding

## Initial Setup and Test
1. Install [Node.js](https://nodejs.org/en/) 
1. clone this scaffolding repository and `cd` into it with your shell (note: if you're on Windows, you can for example use [Git Bash](https://git-scm.com/download/win) as a shell)
1. run `npm install`
1. To compile the TypeScript code to JavaScript, run `npm run tsc`. After that, your repo should have a `build` folder containing a bunch of JavaScript files
1. Run `node build/server.js`, The command line output should say something like `Listening at http://localhost:3000/`
1. Test your installation by opening the following endpoints (i.e. "pages") in your browser:
    - [http://localhost:3000/welcome](http://localhost:3000/welcome)
    - [http://localhost:3000/welcome/BurtMacklin](http://localhost:3000/welcome/BurtMacklin) (or substitute any other name at the end)

## Explanations
**TODO**:
- Only work with TS files, don't edit JS
- Currently only showing GET endpoints, but all HTTP methods available
- Need to figure out how you can get the three different types of parameters
    - path parameters
    - query parameters
    - payload parameters

## Adding a New Endpoint or Controller
To add a new endpoint that logically belongs to an existing controller, you simply have to add a new route to that controller's Router. See `welcome.controller.ts` or `weather.controller.ts` for examples.

If you need to define a new controller () **TODO...**

## Streamline Your Development
So far, you need to recompile your TypeScript code and restart your express application after every change. This can get annoying really quickly, but can streamline this process by doing two things:
1. Instead of `npm run tsc`, use `npm run tsc -- --watch`. This will automatically recompile your TypeScript code to JavaScript every time a TypeScript file has changed on disk, as long as this command is running (i.e. until you abort it or close the shell). Don't forget to check that shell for compiler errors!
1. Install nodemon on your system (`npm install -g nodemon`), then run the express application using `nodemon build/server.js` (instead of `node build/server.js`). Similar to the `--watch` command above, this will restart your Node application (and thus, your server) every time a JavaScript file has changed on disk.

As long as you let these two processes run in two separate shells, your Node server should always be running and be up to date with your latest changes, every time you save one of your TypeScript files.
