const server = require("express").Router();
const { Question, CompletedQuestions } = require('../db');

server.post('/:topicId', (req, res) => {
    const { topicId } = req.params;

    Question.create(req.body)
        .then(newQuestion => newQuestion.setTopic(topicId))
        .then(questionCreated => res.send(questionCreated))
        .catch(err => res.status(500).send(err));
});

server.post('/complete/:questionId', async (req, res) => {
    const { questionId } = req.params;
    const { userId, topicId } = req.query;

    try {
        const questionCompleted = await CompletedQuestions.create({
            userId,
            questionId,
            topicId
        });
        res.send(questionCompleted);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

server.get('/:userId/totalAnswers', async (req, res) => {
    const { userId } = req.params;

    try {
        const usersCompletedQuestions = await CompletedQuestions.findAll({ where: { userId } });
        const counter = {};
        usersCompletedQuestions.forEach(completedQuestion => {
            if (counter[completedQuestion.topicId]) counter[completedQuestion.topicId] = counter[completedQuestion.topicId] + 1;
            else counter[completedQuestion.topicId] = 1;
        });
        res.send(counter);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = server