require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/interviews`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Question, Topic, User, LearningPath } = sequelize.models;

const UserXTopics = sequelize.define('userXtopics', {
  state: {
    type: DataTypes.ENUM,
    values: ['onList', 'isStarted', 'isFinished']
  }
}, { timestamps: false });

const CompletedQuestions = sequelize.define('completedQuestions', {
  topicId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: false });

Topic.hasMany(Question);
Question.belongsTo(Topic);

User.belongsToMany(Topic, { through: UserXTopics });
Topic.belongsToMany(User, { through: UserXTopics });

LearningPath.hasMany(Topic);

User.belongsToMany(Question, { through: CompletedQuestions });
Question.belongsToMany(User, { through: CompletedQuestions });

module.exports = {
  ...sequelize.models,
  CompletedQuestions,
  conn: sequelize,
  UserXTopics
};
