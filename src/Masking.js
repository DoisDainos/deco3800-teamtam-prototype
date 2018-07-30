import React, {Component} from 'react';
import {NavLink, HashRouter} from 'react-router-dom';
import Popup from "reactjs-popup";


/*
Handles the masking component.
Only appears if masking is required post-graph generation

Author: Sim Wei Jie
*/
class Masking extends Component{
    goBack() {
        window.history.back();
    }

    constructor(props){
        super(props);
        this.state = {
            maskingFrequency: "250Hz",
            maskingEar: 'Left',
            testingEar: 'Right',
            conduction: 'Air',
            unmaskedThreshold: 40,
            maskLevel: 50,
            maskCount: 1,
            pureTonalLevel: 40
        }
        this.changeMaskFrequency = this.changeMaskFrequency.bind(this);
        this.changeMaskEar = this.changeMaskEar.bind(this);
        this.changeTestEar = this.changeTestEar.bind(this);
        this.changeConduction = this.changeConduction.bind(this);
        this.changeUnmaskedThreshold = this.changeUnmaskedThreshold.bind(this);
        this.changeMaskLevel = this.changeMaskLevel.bind(this);
        this.changeMaskCount = this.changeMaskCount.bind(this);
        this.response = this.response.bind(this);
        this.noResponse = this.noResponse.bind(this);
        this.changePureTonalLevel = this.changePureTonalLevel.bind(this);
    }

    /* Sets mask frequency*/
    changeMaskFrequency(newFrequency){
        this.setState({maskFrequency: newFrequency});
    }

    /* Sets mask ear*/
    changeMaskEar(newMaskEar){
        this.setState({maskEar: newMaskEar});
    }

    /* Sets test ear*/
    changeTestEar(newTestEar){
        this.setState({testEar: newTestEar});
    }

    /* Sets type of conduction*/
    changeConduction(newConduction){
        this.setState({conduction:newConduction});
    }

    /* Sets Unmasked Threshold*/
    changeUnmaskedThreshold(newUnmaskedThreshold){
        this.setState({unmaskedThreshold:newUnmaskedThreshold});
    }

    /* Sets mask level*/
    changeMaskLevel(newMaskLevel){
        this.setState({maskLevel: newMaskLevel});
    }

    /* Sets mask count*/
    changeMaskCount(newMaskCount){
        this.setState({maskCount: newMaskCount});
    }

    /* Hooked to response button, increases masking and count*/
    response(){
        let newCount = 0;
        newCount = this.state.maskCount + 1;
        this.changeMaskCount(newCount);
        let newMasking  = 0;
        newMasking = this.state.maskLevel + 10;
        this.changeMaskLevel(newMasking);
        //console.log(newCount)
    }

    /* Hooked to no response button, increases pure tone and resets count*/
    noResponse(){
        this.setState({maskCount: 1});

        let pureTone = 0;
        pureTone = this.state.pureTonalLevel + 5;
        this.changePureTonalLevel(pureTone);
    }

    /* Sets pure tone level*/
    changePureTonalLevel(newTonalLevel){
        this.setState({pureTonalLevel:newTonalLevel});
    }

    render(){
        return(
        <HashRouter>
            <div className="mask">
                <header className="App-header">
                  <div className="bannerInfo">
                    <button onClick={this.goBack}><img height={20} src="https://i.imgur.com/ccR1498.png" /></button>
                    <h2 id="pageHeading">Masking</h2>
                  </div>
                </header>
                //<h2>Masking at Frequency: {this.state.maskingFrequency} </h2>
                <p>Masking at Frequency: {this.state.maskingFrequency} </p>
                <p>Masking Ear: {this.state.maskingEar}</p>
                <p>Testing Ear: {this.state.testingEar}</p>
                <p>Conduction: {this.state.conduction}</p>
                <p>Unmasked Threshold: {this.state.unmaskedThreshold}</p>
                <br></br>
                <h2>Masking level: {this.state.maskLevel}db</h2>
                <h2>Pure tonal level: {this.state.pureTonalLevel}</h2>
                <h2>Plateau count: {this.state.maskCount} </h2>
                <h3> Subject responds: <br />
                    <button style={{background:"green"}} onClick={this.response}>Response</button>
                    <button style={{background:"red"}} onClick={this.noResponse}>No Response</button>
                </h3>
                <Popup trigger={<button className= "maskingcompleted">
                    </button>} modal>
                    <h2> Masking completed</h2>
                </Popup>
            </div>
        </HashRouter>
        );
    }
}

export default Masking
