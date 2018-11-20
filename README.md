# Job-For-You
Welcome to Job-For-You. It contains the following components:
- [frontend](https://github.com/scg-unibe-ch/ese2018-team3/tree/master/frontend): an Angular application
- [backend](https://github.com/scg-unibe-ch/ese2018-team3/tree/master/backend): a Node.js application written in TypeScript, using the express.js web framework and our own user database service(s)

## Prerequisites
- You should have [Node.js](https://nodejs.org/en/) and NPM installed (NPM is installed automatically with latest versions of Node.js) which are needed by frontend and backend. You can verify whether you have both by running `node -v` and `npm -v` in terminal or command prompt.
- You should have [Angular CLI](https://cli.angular.io/) globally installed on your machine.
- IDE of your choice

## Understanding project structure
- The main project folder contains two subfolders- frontend and backend. These two are projects on their own which will need to run independently. Launch backend first!
- The backend folder contains express project that serves as a REST API, exposes endpoints to accept HTTP requests. For received HTTP requests, it in turn returns JSON data. 
- The frontend folder contains Angular project, which makes HTTP requests to the backend and processes the JSON data received i.e. make changes if required and display it on the UI.
