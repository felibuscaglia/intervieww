const server = require("express").Router();
const { User, Topic, Question, UserXTopics, CompletedQuestions } = require('../db');

server.post('/:userId/topic/:topicId', async (req, res) => {
    const { userId, topicId } = req.params;

    try {
        const checkIfExists = await UserXTopics.findOne({ where: { userId, topicId } });
        if (!checkIfExists) await UserXTopics.create({ userId, topicId, state: 'isStarted' });
        else await checkIfExists.update({ ...checkIfExists, state: 'isStarted' })
        const user = await User.findByPk(userId, { include: { model: Topic } });
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

server.delete('/:userId/topic/:topicId', async (req, res) => {
    const { userId, topicId } = req.params;

    try {
        await UserXTopics.destroy({ where: { userId, topicId } });
        await CompletedQuestions.destroy({ where: { userId, topicId } });
        res.status(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

server.get('/:userId/:topicId/completedQuestions', async (req, res) => {
    const { userId, topicId } = req.params;
    Question.findAll({
        where: {
            topicId
        },
        include: {
            model: User,
            where: { id: userId }
        }
    })
        .then(questions => res.send(questions))
        .catch(err => res.status(500).send(err));
});

server.post('/:userId/list', async (req, res) => {
    const { userId } = req.params;
    const { topicId } = req.body;

    try {
        await UserXTopics.create({ userId, topicId, state: 'onList' });
        const user = await User.findByPk(userId, { include: { model: Topic } });
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

server.post('/:userId/:topicId/removeTopic', async (req, res) => {
    const { userId, topicId } = req.params;
    try {
        const allQuestionsFromTopic = await Question.findAll({ where: { topicId } });
        const userAnsweredQuestions = await CompletedQuestions.findAll({ where: { topicId, userId } });
        const allQuestionsLength = allQuestionsFromTopic.length;
        const userAnsweredQuestionsLength = userAnsweredQuestions.length;
        if (allQuestionsLength === userAnsweredQuestionsLength) {
            const topicToEnd = await UserXTopics.findOne({ where: { topicId, userId } });
            await topicToEnd.update({ ...topicToEnd, state: 'isFinished' });
            const updatedTopics = await User.findByPk(userId, { include: { model: Topic } });
            res.send(updatedTopics);
        }
        else throw new Error('You need to complete all questions');
    } catch (err) {
        console.error(err);
        res.status(500).send('You need to complete all questions');
    }
})

module.exports = server;