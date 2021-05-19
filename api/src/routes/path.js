const server = require("express").Router();
const { LearningPath, Topic } = require('../db');

server.post('/', (req, res) => {
    LearningPath.create(req.body)
        .then(newPath => res.send(newPath))
        .catch(err => res.status(500).send(err));
});

server.get('/', (req, res) => {
    LearningPath.findAll({ include: { model: Topic } })
        .then(learningPaths => res.send(learningPaths))
        .catch(err => res.status(500).send(err));
});

server.put('/:pathId/:topicId', async (req, res) => {
    const { pathId, topicId } = req.params;

    try {
        const pathToModify = await LearningPath.findByPk(pathId);
        await pathToModify.addTopic(topicId);
        res.send(pathToModify);
    } catch (err) {
        res.status(500).send(err);
    }
});

server.get('/:pathId', (req, res) => {
    const { pathId } = req.params;
    LearningPath.findByPk(pathId, { include: { model: Topic } })
        .then(path => res.send(path))
        .catch(err => res.status(500).send(err))
})

module.exports = server;