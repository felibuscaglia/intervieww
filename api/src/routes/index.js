const { Router } = require('express');
const topicRouter = require('./topic');
const questionRouter = require('./questions');
const authRouter = require('./auth');
const userRouter = require('./user');
const learningPathRouter = require('./path');
const searchRouter = require('./search');

const router = Router();

router.use('/topic', topicRouter);
router.use('/question', questionRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/path', learningPathRouter);
router.use('/search', searchRouter);

module.exports = router;