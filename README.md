# ESE 2018 Scaffolding
Welcome to the 2018 ESE course. You can use this scaffolding as a starting point for your group projects. It contains the following components:
- [frontend](https://github.com/SilasBerger/ESE-2018-Scaffolding/tree/master/frontend): an Angular application
- [backend](https://github.com/SilasBerger/ESE-2018-Scaffolding/tree/master/backend): a Node.js application written in TypeScript, using the express.js web framework 

## Prerequisites
- You should have [Node.js](https://nodejs.org/en/) and NPM installed  which are needed by both Angular and Express projects. You can verify whether you have both by running `node -v` and `npm -v` in terminal or command prompt.

## Getting started
- Clone this repo on your machine and immediately delete `.git` folder.
- Decide among your team members, and create a git repository on Github of your own. Push this project as an initial commit.
- [frontend](https://github.com/SilasBerger/ESE-2018-Scaffolding/tree/master/frontend) and [backend](https://github.com/SilasBerger/ESE-2018-Scaffolding/tree/master/backend) contain instructions to set up the projects on your machines.

## Understanding project structure
- The main project folder contains two subfolders- frontend and backend. These two are projects on their own which you will run independently. 
- The backend folder contains express project that serves as a REST API, exposes endpoints to accept HTTP requests. For received HTTP requests, it in turn returns JSON data.
- The frontend folder contains Angular project, which makes HTTP requests to the backend and processes the JSON data received i.e. make changes if required and display it on the UI.
- Projects are separated in this way because in the future one can easily replace either of them if the team decides to use another technology e.g. React JS for frontend or Django REST framework for backend.
