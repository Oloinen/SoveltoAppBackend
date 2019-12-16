var express = require('express');
var router = express.Router();
const topicController = require('../controllers/topic')
const authMiddleware = require('../middleware/auth')

var io = require('socket.io')();
/* GET home page. */
router
    .get('/api/topics', authMiddleware.checkAuth, topicController.getQuestions)
    .post('/api/topics/question', authMiddleware.checkAuth, topicController.addQuestion)


io.on('connection', socket => {
    console.log('connection toimii');
    var quizUrl = '/student/quiz';
    socket.on('event', () => socket.emit('redirect', quizUrl));
    socket.on('disconnect', client => console.log("disconnected, reload to reconnect"))
})
io.listen(5001);
module.exports = router;
/* console.log('Asiakas lähetti:', viesti) */