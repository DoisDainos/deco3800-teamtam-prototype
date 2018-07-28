import React, { Component } from 'react';
import {NavLink, HashRouter} from 'react-router-dom';
import Popup from "reactjs-popup";
import {Line} from 'react-chartjs-2';

//J's turf, please look for him if you have any problems!
//https://www.youtube.com/watch?v=Ly-9VTXJlnA
//http://www.chartjs.org/docs/latest/charts/line.html
//https://stackoverflow.com/questions/45793890/set-max-value-for-y-axis-in-react-chart
//https://stackoverflow.com/questions/33608040/how-do-i-invert-an-y-axis-using-chart-js-v2-0-dev

import {Input} from "./Input";
import {Masking} from "./Masking";
const rulesModule = require("./Rules");
const checkMaskingRule1 = rulesModule.checkMaskingRule1;

/*
Creates a graph which receives data from input class.
Different types (eg. left or right ear, air or bone) can be generated based on data input.
*/
class Graph extends Component {
  constructor(props){
    super(props);
    const AirUnMaskedLeft = new Image();
    AirUnMaskedLeft.src = "https://imgur.com/VqJdazw.png";
    const AirUnmaskedRight = new Image();
    AirUnmaskedRight.src = "https://i.imgur.com/KMtD63p.png";
    const AirMaskedLeft = new Image();
    AirMaskedLeft.src = "https://i.imgur.com/6KrOAuH.png";
    const AirMaskedRight = new Image();
    AirMaskedRight.src = "https://i.imgur.com/PFXczIl.png";
    const BoneUnmaskedLeft = new Image();
    BoneUnmaskedLeft.src = "https://i.imgur.com/2q2Nglb.png";
    const BoneUnmaskedRight = new Image();
    BoneUnmaskedRight.src = "https://i.imgur.com/kv5twnR.png";
    const BoneMaskedLeft = new Image();
    BoneMaskedLeft.src = "https://i.imgur.com/PO8NtHf.png?1";
    const BoneMaskedRight = new Image();
    BoneMaskedRight.src = "https://i.imgur.com/u4Zfi3I.png?1";
    const NoResponseLeft = new Image();
    NoResponseLeft.src = "https://i.imgur.com/N4NDGBm.png";
    const NoResponseRight = new Image();
    NoResponseRight.src = "https://i.imgur.com/Wmg6zem.png";

    var maskPointsAC = [];
    var target = 500;

    this.state = {
        chartData:{
            labels: [250, 500, 1000, 2000, 4000, 8000],
            datasets:[
                //Unmasked left air test
                {
                    lineTension: 0,   //straight lines
                    data: [],
                    pointStyle: [AirUnMaskedLeft, AirUnMaskedLeft, AirUnMaskedLeft, AirUnMaskedLeft, AirUnMaskedLeft, AirUnMaskedLeft],
                    backgroundColor:[   //colour below line
                        'rgba(0,0,0,0)'
                    ],
                    borderColor:[       //color of line
                        '#0000ff'
                    ]
                },
                {
                    lineTension: 0,   //straight lines
                    data: [],
                    pointStyle: [AirUnmaskedRight, AirUnmaskedRight, AirUnmaskedRight, AirUnmaskedRight, AirUnmaskedRight, AirUnmaskedRight],
                    backgroundColor:[   //colour below line
                        'rgba(0,0,0,0)'
                    ],
                    borderColor:[       //color of line
                        '#0000ff'
                    ]
                },
                {
                    lineTension: 0,   //straight lines
                    data: [],
                    pointStyle: [BoneUnmaskedLeft, BoneUnmaskedLeft, BoneUnmaskedLeft, BoneUnmaskedLeft, BoneUnmaskedLeft, BoneUnmaskedLeft],
                    backgroundColor:[   //colour below line
                        'rgba(0,0,0,0)'
                    ],
                    borderColor:[       //color of line
                        '#0000ff'
                    ]
                },
                {
                    lineTension: 0,   //straight lines
                    data: [],
                    pointStyle: [BoneUnmaskedRight, BoneUnmaskedRight, BoneUnmaskedRight, BoneUnmaskedRight, BoneUnmaskedRight, BoneUnmaskedRight],
                    backgroundColor:[   //colour below line
                        'rgba(0,0,0,0)'
                    ],
                    borderColor:[       //color of line
                        '#0000ff'
                    ]
                }

            ]
        },

        chartOptions: {
            legend:{
                display:false
            },
            scales:{
                yAxes: [{
                    ticks: {
                        //beginAtZero:true,
                        reverse:true,   //flips graph
                        stepSize:10,    //jump 10
                        min:-5,
                        max:120,
                        maintainAspectRatio: false
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'rgba(40,40,40,1)',
                        userCallback: function(tick) {
                            var display;
          									if(tick >= 1000) {
                                display = tick / 1000 + "k";
          									} else {
                                display = tick;
                            }
                            return display;
                        },
                    }
                }]
            }
        }
    }
    this.onUpdate = this.onUpdate.bind(this);
  }

  /*
   * Show input, hide graph
   */
  showInput() {
      document.getElementById("inputScreen").className="showing";
      document.getElementById("graphScreen").className="hidden";
  }

  /*
   * Show graph, hide input
   */
  showGraph() {
      document.getElementById("inputScreen").className="hidden";
      document.getElementById("graphScreen").className="showing";
  }

  /*
   * Using data from input, update the graph
   */
  onUpdate(freq, threshold, isLeft, isAir) {
      //decide which dataset
      let index;
      if (isLeft && isAir) {
          index = 0;
      }
      else if (!isLeft && isAir) {
          index = 1;
      }
      else if (isLeft && !isAir) {
          index = 2;
      }
      // !isLeft && !isAir
      else {
          index = 3;
      }
      //add the data to the dataset
      let chartData = this.state.chartData;
      //let newLabels = chartData.labels;
      let datasets = chartData.datasets;
      let newData = chartData.datasets[index].data;
      //newLabels.push(freq);
      newData.push(threshold);

      const newDataset = {
          ...this.state.chartData.datasets[index],
          data: newData
      }

      //checkMasking(left ear, right ear, air conduction)
      this.maskPointsAC = checkMaskingRule1(chartData.datasets[0].data,
          chartData.datasets[1].data);
      this.maskPointsAC = checkMaskingRule1(chartData.datasets[1].data,
          chartData.datasets[0].data);

      //if masking array not empty, means masking is required, so change image
      if (this.maskPointsAC.length > 0) {
          var maskAlert = document.getElementById("alert");
          maskAlert.setAttribute("src", "https://imgur.com/7drUc8O.png");
          document.getElementById("maskLink").classList.remove("maskLinkDisabled");
      } else {
          var maskAlert = document.getElementById("alert");
          maskAlert.setAttribute("src", "https://i.imgur.com/axIfGHV.png");
          document.getElementById("maskLink").className = "maskLinkDisabled";
      }

      datasets.filter((item) => item !== this.state.chartData.datasets[index]);
      datasets.concat(newDataset);
      const updated = {
          ...chartData,
          //labels: newLabels,
          datasets: datasets
      }

      this.setState({chartData : updated});
      var confirmMessage = document.getElementById("submitConfirm")
      confirmMessage.appendChild(document.createTextNode("Point added"));
      setTimeout(function () {
          confirmMessage.removeChild(confirmMessage.childNodes[0]);
      }, 2000);
  }

  goBack() {
      window.history.back();
      window.history.back();
  }

  render() {
    return (
        <HashRouter>
            <div>
                <div id="graphScreen" className="showing">
                    <header className="App-header">
                      <div className="bannerInfo">
                        <Popup trigger={<button><img height={20} src="https://i.imgur.com/ccR1498.png" /></button>} modal>
                             <div className="backCheck">
                                <p>Are you sure?<br /><br /> Your data will not be saved.</p>
                                <div className="button-container">
                                    <div className="grid-item"><button onClick={this.goBack}>Yes</button></div>
                                </div>
                                <p><br /></p>
                              </div>
                        </Popup>
                        <h2 id="pageHeading">Create audiogram</h2>
                      </div>]
                    </header>
                    <h1>Audiogram</h1>
                    <div className="popups">
                        <div className="save">
                            <Popup trigger={<button className= "popup-trigger"> Save
                            </button>} modal>
                                <p>Enter title:</p>
                                <form action="">
                                    <input type="text" name="audiogram_title" />
                                    <br />
                                    <input type="submit" value="Submit" />
                                </form>
                            </Popup>
                        </div>
                        <div className="symbols">
                            <Popup trigger={<button className= "popup-trigger"> Symbols
                            </button>} modal>
                                <div className="grid-container">
                                    <div className="grid-item"><strong>KEY</strong></div>
                                    <div className="grid-item"><strong>RIGHT</strong></div>
                                    <div className="grid-item"><strong>LEFT</strong></div>

                                    <div className="grid-item">AC Unmasked</div>
                                    <div className="grid=item"><img src=
                                    "https://i.imgur.com/BtWXB20.png" title=
                                    "source: imgur.com" width={13} height={13}/></div>
                                    <div className="grid-item"><img src=
                                    "https://imgur.com/VqJdazw.png" title=
                                    "source: imgur.com" width={10} height={10}/></div>

                                    <div className="grid-item">AC Masked</div>
                                    <div className="grid=item"><img src=
                                    "https://i.imgur.com/PFXczIl.png" title=
                                    "source: imgur.com" width={13} height={13}/></div>
                                    <div className="grid-item"><img src=
                                    "https://i.imgur.com/6KrOAuH.png" title=
                                    "source: imgur.com" width={12} height={12}/></div>

                                    <div className="grid-item">BC Unmasked</div>
                                    <div className="grid=item"><img src=
                                    "https://i.imgur.com/kv5twnR.png" title=
                                    "source: imgur.com" width={11} height={11}/></div>
                                    <div className="grid-item"><img src=
                                    "https://i.imgur.com/2q2Nglb.png" title=
                                    "source: imgur.com" width={11} height={11}/></div>

                                    <div className="grid-item">BC Masked</div>
                                    <div className="grid=item"><img src=
                                    "https://i.imgur.com/u4Zfi3I.png?1" title=
                                    "source: imgur.com" width={13} height={12}/></div>
                                    <div className="grid-item"><img src=
                                    "https://i.imgur.com/PO8NtHf.png?1" title=
                                    "source: imgur.com" width={13} height={12}/></div>

                                    <div className="grid-item">No Response</div>
                                    <div className="grid=item"><img src=
                                    "https://i.imgur.com/Wmg6zem.png" title=
                                    "source: imgur.com" width={13} height={13}/></div>
                                    <div className="grid-item"><img src=
                                    "https://i.imgur.com/N4NDGBm.png" title=
                                    "source: imgur.com" width={13} height={13}/></div>
                                </div>
                            </Popup>
                        </div>
                    </div>
                    <div className="chart">
                      <Line


                        height={300}
                        data = {this.state.chartData}
                        options = {this.state.chartOptions}
                        redraw
                       />
                    </div>
                    <NavLink id="maskLink" className="maskLinkDisabled"
                    to="./Masking"><img id="alert"
                    src="https://i.imgur.com/axIfGHV.png" /></NavLink>
                    <button id="goToInput" onClick={this.showInput}>Add threshold</button>
                </div>
                <div id="inputScreen" className="hidden">
                    <header className="App-header">
                      <div className="bannerInfo">
                        <button onClick={this.showGraph}><img height={20} src="https://i.imgur.com/ccR1498.png" /></button>
                        <h2 id="pageHeading">Add threshold</h2>
                      </div>]
                    </header>
                    <Input onSubmit = {this.onUpdate}/>
                </div>
            </div>
        </HashRouter>

    );
  }
}

export default Graph
