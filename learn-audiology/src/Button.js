import React from 'react';

/*
 * Display button in data input 
 */
export class Button extends React.Component {

    render() {
        return (
            <button type="button" onClick = {this.props.onClick} style = {{backgroundColor:this.props.colour}}>
                {this.props.name}
            </button>
        );
    };
}
