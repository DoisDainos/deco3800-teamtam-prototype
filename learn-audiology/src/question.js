import React, {Component} from 'react';
import {NavLink, HashRouter} from 'react-router-dom';
const API_END_POINT = 'http://localhost:8080';
export default class Question extends Component {
    constructor(props) {
        super(props);
        this.getQuestion();
        this.state = {
            question: [],
            questionid: null,
            status: null
        }
    }
    onInputChange(e) {
        console.log(e)
    }
    getQuestion() {
        fetch(API_END_POINT +'/question')
            .then(response => response.json())
            .then(question => {
                this.setState({
                    questionid: question.id
                })
               var renderQuestion = () => {
                    return (
                        <div>
                            <label>{question.title} </label>
                       
                            {question.options.map(function(option, index) {
                            return (
                                <div key ={index}> 
                                 <input name='answer'  type ='radio' value={option}/>
                                 <span>{option}</span>
                                </div>
                            )
                        })}
                         </div>
                        
                    )
                }
               this.setState({
                   question: renderQuestion()
               })
            })
    }
    onFormSubmit() {
        var answerInput= document.querySelector('input:checked');
        if(answerInput) {
            var answer = answerInput.value;
            fetch(API_END_POINT+'/question/checkanswer',{
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id:this.state.questionid,
                    answer
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data) {
                    this.setState({
                        status: 'Your answer is correct'
                    })
                } else {
                    this.setState({
                        status: 'Your Answer is incorrect'
                    })
                }
                console.log(data)
            })
              
        }
    }
    renderStatus() {
        if(this.state.status) {
            return (
                <div>
                    <p>{this.state.status}</p>
                </div>
            )
        }
    }
    goBack() {
        window.history.back();
    }
    render() {
        return (
            <div>
                <header className="App-header">
                                <div className="bannerInfo">
                                <button onClick={this.goBack}><img height={20} src="https://i.imgur.com/ccR1498.png" /></button>
                                <h2 id="pageHeading">Question</h2>
                                </div>
                </header>
                <div className = 'questionForm'>
                    {this.renderStatus()}
                    {this.state.question}
                    <button onClick = {this.onFormSubmit.bind(this)}> Submit</button>
                </div>
            </div>
        )
    }
}
