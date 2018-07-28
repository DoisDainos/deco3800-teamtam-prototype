
const Question = require('../core/model/question');
function getQuestion() {
    return new Promise((resolve, reject) => { 
       
        Question.findAll({}, {raw:true}).then(data => {
            var luckyNumber = Math.floor((Math.random() * data.length));
            var question = data[luckyNumber];
            question.options = question.options.split(',');
            question.rightanswer=undefined;
            resolve(question)
        }).catch(err => reject(err))
    })
}

function checkQuestionAnswer(id, answer) {  
    return new Promise((resolve, reject) => { 
        Question.findOne({ //im calling to model to find. So controll is only for the checking step? Checking as in validating the answer yes
            where: {
                id,
                rightanswer: answer
            }
        }, {raw: true}).then(response => {// there is result of your request
    
            if(response) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}
function deleteQuestion() {

}
function changeQuestionOptions(){

}
module.exports = {getQuestion, checkQuestionAnswer}