import React, { Component } from 'react';
import {NavLink, HashRouter} from 'react-router-dom';

//https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe

/*
Settings class. Allows for user to set country parameters
*/
class Setting extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCountries: false
        }

        this.showCountries = this.showCountries.bind(this)
    }

    showCountries(event){
        event.preventDefault();

        this.setState({
            showCountries: true,
        });
    }

    goBack() {
        window.history.back();
    }

    render(){
        return (
                <HashRouter>
                    <div>
                        <header className="App-header">
                            <div className="bannerInfo">
                              <button onClick={this.goBack}><img height={20} src="https://i.imgur.com/ccR1498.png" /></button>
                              <h2 id="pageHeading">Settings</h2>
                            </div>
                        </header>
                        <div className="setting">
                            <h3> Country:
                            <button onClick={this.showCountries}>
                                Australia
                            </button>
                            </h3>
                            {this.state.showCountries ?(
                            <div className="menu">
                                <button> United States</button>
                            </div>
                            )
                            :(
                                null
                            )
                            }
                        </div>

                    </div>
                </HashRouter>

            );
    }
}

export default Setting;
