const server = require("express").Router();
const { Topic, Question } = require('../db');

server.get('/', (req, res) => {
    Topic.findAll({ include: { model: Question } })
        .then(topics => res.send(topics))
        .catch(err => res.status(500).send(err));
});

server.get('/:topicId', (req, res) => {
    const { topicId } = req.params;

    Topic.findByPk(topicId, { include: { model: Question } })
        .then(topic => res.send(topic))
        .catch(err => res.status(500).send(err));
});

server.post('/', (req, res) => {
    Topic.create(req.body)
        .then(newTopic => res.send(newTopic))
        .catch(err => res.status(500).send(err));
});

module.exports = server;