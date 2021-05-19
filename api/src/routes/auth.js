const server = require("express").Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User, Topic } = require('../db');
const { JWT_SECRET } = process.env;

server.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        const { name, email, id } = user;
        res.send(jwt.sign({ name, email, id }, JWT_SECRET));
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

server.post('/login', async (req, res, next) => {
    passport.authenticate('local', async function (err, user) {
        if (err) return next(err);
        else if (!user) return res.sendStatus(401);
        return res.send(jwt.sign(user, JWT_SECRET))
    })(req, res, next)
})

module.exports = server;