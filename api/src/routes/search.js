const server = require("express").Router();
const Sequelize = require('../db').conn;
const { Topic, LearningPath } = require('../db');

server.get('/', async (req, res) => {
    let { query } = req.query;

    if (!query.length) return res.send([]);

    query = query.toLowerCase();

    const topicSql = `
    SELECT * FROM topics
    WHERE LOWER(title) LIKE '${query}%'
    LIMIT 10`;

    const pathSql = `
    SELECT * FROM "learningPaths"
    WHERE LOWER(title) LIKE '%${query}%'
    LIMIT 10`;

    const topicResult = await Sequelize.query(topicSql, { model: Topic });
    const pathResult = await Sequelize.query(pathSql, { model: LearningPath })
    res.send(topicResult.concat(pathResult));
})

module.exports = server;