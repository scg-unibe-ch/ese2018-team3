# Front-End

## Initial Setup
1. Install [Node.js](https://nodejs.org/en/) 
1. `cd` into this frontend folder with your terminal or command prompt
1. Run `npm install` which will install all the required dependencies
1. When successful, run `ng serve --open` - this will open the application in your default web browser.
1. Alternatively, you can run just `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. This `dist` folder is used to put on production server.

## Deployment
- For best results, use `ng serve --prod` that will lead to many resources being pre-loaded leading to a speed-up, that may come at the cost of some project stability.

## Further development 
- Run `ng generate component component-name` to generate a new component. 
- You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module` to generate other artifact.
- This project is generated with [Angular CLI](https://github.com/angular/angular-cli) 

## Common Steps for Troubleshooting
- Is the backend running?
- Did the project build without issues?
- A lot of changes? Try `npm update`
- Try Ctrl + C to quit the frontend and backend and start them again
- Is the module in the app.module.ts?
- Refactoring? Did you change all relevant routes, modules, imports to and from the refactored part?
