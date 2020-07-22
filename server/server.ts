import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import errorHandler from 'strong-error-handler';
import { createConnection, getRepository } from 'typeorm';
import { User } from './models/user/User';
import { Session } from './models/user/Session';
//Import seeders
import UserSeeder from './seeders/UserSeeder';
import RantSeeder from './seeders/RantSeeder';
import TopicSeeder from './seeders/TopicSeeder';
//Import controllers 
import userController from './controllers/userController';
import rantController from './controllers/rantController';
import responseController from './controllers/responseController';
import { TypeormStore } from 'connect-typeorm/out';
import 'reflect-metadata';

var envPath: any = process.env.NODE_ENV === 'production' ? path.join(__dirname, '.env.prod') : path.join(__dirname, '.env');
dotenv.config({path: envPath}) 
export const app = express();
const port = process.env.PORT || 7000;
const cookieOptions = {
    secret: "Rant Secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: null
};
var newsApiKey: string = "29f1e284053e4529a0918faf53d9808f";
app.use( express.static( `${__dirname}/../build` ) );
createConnection({
    "type": "mysql",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_SCHEMA,
    "synchronize": true,
    "logging": true,
    "entities": [
        "models/**/*.ts",
        "Entity.ts"
    ],
    "migrations": [
    "migrations/**/*.ts"
    ],
    "subscribers": [
    "subscribers/**/*.ts"
    ]
})
.then(async database => {
    app.set('db', database);
})
.catch(error => {
    console.log("Connect to database error.....", error);
});

app.use((req, res, next) => {
    const sessionRepo = getRepository(Session);
    app.set('sessionRepo', sessionRepo);
    cookieOptions.store = new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false,
        ttl: 86400,
    }).connect(sessionRepo)
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '5mb' }));

if(app.get('env') === 'production') {
    app.set('trusted proxy', 1);
    cookieOptions.cookie.secure = true;
}

app.use(session(cookieOptions));

// enable corse for all origins
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type,authorization");  
    next();
});
  
//Seed data
//Seed User Data
app.use(async (req, res, next) => {
    var seeder = new UserSeeder(req);
    await seeder.Seed();
    next();
});
//Seed Rant Data
app.use(async (req, res, next) => {
    var seeder = new RantSeeder(req);
    await seeder.Seed();
    next();
});
//Seed Topic Data
app.use(async (req, res, next) => {
    var seeder = new TopicSeeder(req);
    await seeder.Seed();
    next();
});

app.use(errorHandler({
    debug: process.env.ENV !== 'prod',
    log: true
}));

// user
userController();
//rants
rantController();
//responses
responseController();
// app.get('/api/users/:id', getUser);

// messages
// app.post('/api/messages', postMessages);
// app.put('/api/messages/:id', putMessage);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));