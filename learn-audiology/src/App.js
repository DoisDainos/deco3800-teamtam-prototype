import React, { Component } from 'react';
import './style.css';
import Graph from "./Graph";
import Home from "./Home";
import Input from "./Input";
import Info from "./info"
import Setting from "./Setting"
import Mode from "./Mode";
import Masking from "./Masking";
import Question from './question';

import {Route, HashRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/graph" component={Graph}/>
            <Route path="/input" component={Input}/>
            <Route path="/info" component={Info}/>
            <Route path="/setting" component={Setting}/>
      			<Route path="/mode" component={Mode}/>
      			<Route path="/masking" component={Masking}/>
      			<Route path="/question" component={Question}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
