/* app/server.ts */

// Import everything from express and assign it to the express variable
import express from 'express';

// Import WelcomeController from controllers entry point
import {WelcomeController, WeatherController} from './controllers';

// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on

var port: number = 3000;
if(process.env.PORT !== undefined){
	port = parseInt(process.env.PORT)
}

// Mount the WelcomeController at the /welcome route
app.use('/welcome', WelcomeController);

app.use('/weather', WeatherController);

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
