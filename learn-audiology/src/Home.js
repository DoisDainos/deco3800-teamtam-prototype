import React, { Component } from 'react';
import {Route, NavLink, HashRouter} from 'react-router-dom'


class Home extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
        <div>
            <h1>Welcome</h1>
            <Grid />
        </div>
        );
    }
}

class DataOption extends Component {
  function
  render() {
    return (
      //<button className="option" onClick={i => newPage()}>Input data
       // {/* TODO */}
      //</button>
      <HashRouter>
        <NavLink to='/mode' className="option">
            <img height={50} className="optionImage" src="https://imgur.com" />
            Create audiogram
        </NavLink>
      </HashRouter>
    );
  }
}

class InfoOption extends Component {
  function
  render() {
    return (
      <HashRouter>
        <NavLink to='/info' className="option">
            <img height={50} className="optionImage" src="https://imgur.com" />
            More Info
        </NavLink>
      </HashRouter>
    );
  }
}
/* you still there.ping ping */
class QuestionSection extends Component {
  render() {
    return (
      <HashRouter>
              <NavLink to='/question' className="option">Questions</NavLink>
               
      </HashRouter>
    );
  }
}

class Option extends Component {
  render() {
    return (
      <button className="option">
        {/* TODO */}
      </button>
    );
  }
}

class Grid extends Component {
  renderDataOption() {
    return <DataOption />;
  }
  renderInfoOption() {
    return <InfoOption />;
  }
  renderOption() {
    return <Option />;
  }


  renderQuestionOption() {
    return <QuestionSection />
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <div className="bannerInfo">
            <h3 id="pageHeading" className="homeHeading">Learn Audiology</h3>
            <NavLink to="/setting" className="gear"><img height={40} src="https://imgur.com/7UTW7Yl.png" /></NavLink>
          </div>
        </header>
        <div className="grid">
          <div className="grid-row">
            {this.renderDataOption()}
            {this.renderInfoOption()}
          </div>
          <div className="grid-row">

            {this.renderQuestionOption()}

          </div>
        </div>
      </div>
    );
  }
}


export default Home;
