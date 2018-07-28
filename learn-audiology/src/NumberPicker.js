import React from 'react';

/*
 * Presentational class to display frequency and threshold options for data input
 */
export class NumberPicker extends React.Component {
    render() {
        return (
            <div>
                <button type="button" onClick = {this.props.decrease}> - </button>
                <label>{this.props.number}</label>
                <button type="button" onClick = {this.props.increase}> + </button>
            </div>
        )

    }
}
