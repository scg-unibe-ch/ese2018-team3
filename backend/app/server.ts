// import everything from express and assign it to the express variable
import express from 'express';
import {sha256} from 'js-sha256';
// import all the controllers. If you add a new controller, make sure to import it here as well.
import {
    AdminController,
    JobController,
    UserController,
    UserServicesController
} from './controllers';
import {Sequelize} from 'sequelize-typescript';
import {AdminModel, JobModel, UserModel, UserToJobModel} from './models';

const sequelize = new Sequelize({
    database: 'development',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db.sqlite'
});

sequelize.addModels([AdminModel, JobModel, UserModel, UserToJobModel]);

// create a new express application instance
const app: express.Application = express();
app.use(express.json());

// define the port the express app will listen on
let port: number = 3000;
if (process.env.PORT !== undefined) {
    port = parseInt(process.env.PORT);
}

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use('/jobs', JobController);
app.use('/users', UserController);
app.use('/admins', AdminController);
app.use('/user-services', UserServicesController);

sequelize.sync().then(async () => {

    console.log('\nCreating admin...');
    try {
        const admin_user = new UserModel();
        admin_user.fromSimplification({
            'username': 'admin',
            'email': 'support@jobforyou.ch',
            'password': sha256('secure'),
            'isApproved': true
        });
        await admin_user.save();

        const admin = new AdminModel();
        admin.fromSimplification({
            'userId': admin_user.toSimplification().id
        });
        await admin.save();
    } catch (e) {
        console.log('AdminModel user already present\n');
    }

    // start serving the application on the given port
    app.listen(port, () => {
        // success callback, log something to console as soon as the application has started
        console.log(`Listening at http://localhost:${port}/`);
    });
});