const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {
    mongoose
} = require('./db/mongoose');
const {
    Todo
} = require('./models/todo');
const {
    User
} = require('./models/user');

const port = process.env.PORT || 3000;
let app = express();
app.use(bodyParser.json())
    .post('/todos', (req, res) => {
        let todo = new Todo({
            text: req.body.text
        });
        todo.save()
            .then((data) => res.send(data), (error) => res.status(400).send(error));
    })
    .post('/users', (req, res) => {
        var user = new User(_.pick(req.body, ['email', 'password']));
        user.save()
            .then(() => {
                return user.generateAuthToken();
                // res.send(data);
            })
            .then((token) => {
                res.header('x-auth', token).send(user);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    })
    .get('/todos', (req, res) => {
        Todo.find().then((todos) => {
            res.send({
                todos
            });
        }, (error) => {
            res.status(400).send(error);
        });
    })
    .get('/todos/:id', (res, req) => {
        Todo.findById(res.params.id).then((data) => {
            req.send(data);
        }, (error) => {
            res.status(400).send(error);
        });
    })
    .listen(port, () => console.log(`Started on port ${port}`));

module.exports = {
    app
}