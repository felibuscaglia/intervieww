const server = require("express").Router();
const { LearningPath, Topic } = require('../db');

server.post('/', async (req, res) => {
    const { data, topics } = req.body;

    try {
        const newPath = await LearningPath.create(data);
        const topicsIds = topics.map(topic => topic.id);
        await newPath.setTopics(topicsIds);
        res.send(newPath);
    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
});

server.get('/', (req, res) => {
    LearningPath.findAll({ include: { model: Topic } })
        .then(learningPaths => res.send(learningPaths))
        .catch(err => res.status(500).send(err));
});

server.get('/:pathId', (req, res) => {
    const { pathId } = req.params;
    LearningPath.findByPk(pathId, { include: { model: Topic } })
        .then(path => res.send(path))
        .catch(err => res.status(500).send(err))
})

module.exports = server;