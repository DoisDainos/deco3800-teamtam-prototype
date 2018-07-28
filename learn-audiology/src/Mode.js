import React, { Component } from 'react';
import {Route, NavLink, HashRouter} from 'react-router-dom';


class Mode extends Component {
  goBack() {
      window.history.back();
  }

  render() {
    return (
      <div>
      <header className="App-header">
        <div className="bannerInfo">
          <button onClick={this.goBack}><img height={20} src="https://i.imgur.com/ccR1498.png" /></button>
          <h2 id="pageHeading">Choose a mode</h2>
        </div>
      </header>
		<br/>
		<li><NavLink to="./">Go back</NavLink></li>
		<br/>
        <Grid />
      </div>
    );
  }
}

class NoviceOption extends Component {
  function
  render() {
    return (
      //<button className="option" onClick={i => newPage()}>Input data
       // {/* TODO */}
      //</button>
      <HashRouter>
        <NavLink to='/graph' id="firstOption" className="option modeOption" style={{align: 'center', padding: '10px 20px 5px 20px', height: '50%', width:'80%', textAlign: 'left', fontSize: 18, lineHeight: 1, textDecoration: 'none'}}>

		<strong>Tutorial</strong>

		<p>Input data, masking recommendation provided. <br/> Suitable for all students.</p>
		</NavLink>
      </HashRouter>
    );
  }
}

class AdvancedOption extends Component {
  function
  render() {
    return (
      <HashRouter>
        <NavLink to='/graph' className="option modeOption" path="/:testvalue" params={{ mode: 'Advanced' }} style={{align: 'center', padding: '10px 20px 5px 20px', height: '50%', width:'80%', textAlign: 'left', fontSize: 18, lineHeight: 1, textDecoration: 'none'}}>

		<strong>Advanced</strong>

		<p /*font-size="3"*/>Input data, no masking recommendation. <br/> Suitable for experienced user.</p>
		</NavLink>
      </HashRouter>
    );
  }
}

class Grid extends Component {
  renderNoviceOption() {
    return <NoviceOption />;
  }
  renderAdvancedOption() {
    return <AdvancedOption />;
  }
  render() {
    return (
      <div className="grid">
        <div className="grid-row">
          {this.renderNoviceOption()}
        </div>
		<br/>
        <div className="grid-row">
          {this.renderAdvancedOption()}
        </div>
      </div>
    );
  }
}


export default Mode;
