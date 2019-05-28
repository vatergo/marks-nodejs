import express from 'express';
//import * as thingStore from './thing-store';

import * as usersDb from './utils/user';
import * as thingsDb from './utils/thing';

usersDb.setUpConnection();
thingsDb.setUpConnection();

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

//Api - USERS

app.get('/api/users/:id', (req, res) => {
    usersDb.findUserById(req.params.id)
        .then(data => {
            res.send(JSON.stringify({ userName: data.login }));
            throw new Error('Not found');
        })
        .catch(e => {
            res.status('404').end()
        });
});

app.post('/api/users/auth', (req, res) => {
    usersDb.findUser(req.body.login)
        .then(data => {
            if (req.body.password === data[0].password) {
                res.send(JSON.stringify({ userId: data[0]._id }));
            }
            throw new Error('Wrong password');
        })
        .catch(e => {
            if (e.message === 'Wrong password') res.status('401').end()
            res.status('404').end()
        });
});

app.post('/api/users/reg', (req, res) => {
    usersDb.findUser(req.body.login)
        .then(data => {
            if (data.length !== 0) res.status('401').end();
            else {
                usersDb.createUser(req.body.login, req.body.password)
                    .then(data => {
                        res.status('201').send(JSON.stringify({ userId: data._id }));
                    })
            }
        });
});

//Api - THINGS

app.get('/api/things', (req, res) => {
    thingsDb.getAllProducts(req.headers['set-cookie'][0].split(';')[0].split('=')[1])
        .then(data => {
            res.send(JSON.stringify(data));
        });
    //res.send(JSON.stringify(thingStore.getAllProducts()));
});

app.get('/api/things/:itemId', (req, res) => {
    let userId = req.headers['set-cookie'][0].split(';')[0].split('=')[1];//кукии очень стремные, надо разобраться
    thingsDb.getProduct(req.params.itemId, userId)
        .then(data => {
            if (data.length !== 0) res.status('400').end();
            else {
                thingsDb.addProduct(req.params.itemId, userId)
                    .then(data => res.status('201').send('OK'));
            }
        });
    //thingStore.addProduct(req.params.id).then(data => res.send(data)).catch(msg => console.log(msg));
});

app.delete('/api/things/:itemId', (req, res) => {
    let userId = req.headers['set-cookie'][0].split(';')[0].split('=')[1];//кукии очень стремные, надо разобраться
    thingsDb.deleteProduct(req.params.itemId, userId)
        .then(data => {
            res.send(JSON.stringify(data));
        });
});

const server = app.listen(8080, () => console.log('Server is up and running on port 8080'));