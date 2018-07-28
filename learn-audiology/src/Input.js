import React from 'react';
import {Button} from './Button';
import {NumberPicker} from './NumberPicker';
import Graph from "./Graph";

/*
 * Input page where users submit data input for the graph
 */
export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLeft : false, isRight : false,
                      isAir : false, isBone: false,
                      freq : 250, threshold : 0}
        this.handleLeftEarClick = this.handleLeftEarClick.bind(this);
        this.handleRightEarClick = this.handleRightEarClick.bind(this);
        this.handleAirClick = this.handleAirClick.bind(this);
        this.handleBoneClick = this.handleBoneClick.bind(this);
        this.decreaseFreq = this.decreaseFreq.bind(this);
        this.increaseFreq = this.increaseFreq.bind(this);
        this.decreaseThres = this.decreaseThres.bind(this);
        this.increaseThres = this.increaseThres.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //toggle the input choice for Left Ear
    handleLeftEarClick() {
        this.setState({isLeft : !this.state.isLeft});
    }

    //toggle the input choice for Right Ear
    handleRightEarClick() {
        this.setState({isRight : !this.state.isRight});
    }

    //toggle the input choice for Air Conduction
    handleAirClick() {
        this.setState({isAir : !this.state.isAir});
    }

    //toggle the input choice for BoneConduction
    handleBoneClick() {
        this.setState({isBone : !this.state.isBone});
    }

    //decrease the frequency input
    decreaseFreq() {
        let newFreq = 0;
        if (this.state.freq > 250) {
            newFreq = this.state.freq - this.state.freq / 2;
        } else {
            newFreq = 250;
        }
        this.setState({freq : newFreq});
    }

    //increase the frequency input
    increaseFreq() {
        let newFreq = 0;
        if (this.state.freq < 8000) {
            newFreq = this.state.freq * 2;
        } else {
            newFreq = 8000;
        }
        this.setState({freq : newFreq});
    }

    //decrease the input threshold
    decreaseThres() {
        let newThres = this.state.threshold - 5;
        this.setState({threshold : newThres});
    }

    //increase the input threshold
    increaseThres() {
        let newThres = this.state.threshold + 5;
        this.setState({threshold : newThres});
    }

    /* Handle the Submit event
     * Check if the input is valid and pass the data to graph.
     * And reset the default value when done.
     */
    handleSubmit() {
        if (this.state.isLeft === this.state.isRight) {
            alert("Please choose either left ear or right ear");
        }
        else if (this.state.isAir === this.state.isBone) {
            alert("Please choose either air conduction or bone conduction");
        }
        //other data checking??
        else {

            this.props.onSubmit(
                this.state.freq, this.state.threshold,
                this.state.isLeft, this.state.isAir);
            // clear the selection
            this.setState({isLeft : false, isRight : false, isAir : false,
            isBone : false, freq : this.state.freq,
            threshold : this.state.threshold});

        }

    }

    // display presentational components of the data input.
    render(){
        let leftColour = this.state.isLeft ? 'green' : 'white';
        let rightColour = this.state.isRight ? 'green' : 'white';
        let airColour = this.state.isAir ? 'green' : 'white';
        let boneColour = this.state.isBone ? 'green' : 'white';
        return (
          <div>
            <form>
                <label>Test Ear</label>
                <Button onClick = {this.handleLeftEarClick} name="Left Ear" colour = {leftColour}/>
                <Button onClick = {this.handleRightEarClick} name="Right Ear" colour = {rightColour}/>
                <br/>
                <label>Conduction</label>
                <Button onClick = {this.handleAirClick} colour = {airColour} name="Air" />
                <Button onClick = {this.handleBoneClick} colour = {boneColour} name="Bone"/>
                <br/>
                <label>Frequency (Hz)</label>
                <br/>
                <NumberPicker decrease = {this.decreaseFreq} increase = {this.increaseFreq}
                              number = {this.state.freq} />
                <label>Intensity (dB)</label>
                <br />
                <NumberPicker decrease = {this.decreaseThres} increase = {this.increaseThres}
                              number = {this.state.threshold} />
                <br/>
                <div id="submitConfirm"></div>
                <input type="submit" onClick={this.handleSubmit} />
            </form>
          </div>
        )
    }
}
export default Input;
