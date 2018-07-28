const app = require('express')()
const Question = require('./core/model/question');
const questionController = require('./controller/question.controller');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
//this route i use for get all question from database
app.get('/question', (req, res) => {
    //client: i want to get all question
    //route(handling): ok let me ask controller
    //do you know then catch? it is similar to java's catch exception? finds any error and give a meaning message to it
    //yes.but not only. for more information you can researc
    //"promise function" in google ok 
    // getQuestion() is a promise function
    //
    questionController.getQuestion().then(questions => {
        res.json(questions)
    }).catch(err => res.status(400).send(err))
})
/*
talk about client side first:
client -> server -> controller -> model 
client <-- presenter <--
in this case: route is presenter  also a listener of server
just think it simple
client->server->client again yup

*/
app.post('/question/checkanswer', (req, res) => {

    questionController.checkQuestionAnswer(
        req.body.id,
        req.body.answer)
        .then(isCorrect => res.send(isCorrect))
       
})
Question.sync({force: false}).then(() => {
    app.listen(8080, () => {
        console.log('running')
    })
})