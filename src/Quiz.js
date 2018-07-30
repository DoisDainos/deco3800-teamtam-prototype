import React, { Component } from 'react';
import {NavLink, HashRouter} from 'react-router-dom';
import {Line} from 'react-chartjs-2';
import './style.css';
import Graph from "./Graph";
import Popup from "reactjs-popup";
//import {Line} from 'react-chartjs-2';
import {Input} from "./Input";

class Quiz extends Component {

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
    BoneUnmaskedLeft.src = "https://i.imgur.com/2q2Nglb.png"
    const BoneUnmaskedRight = new Image();
    BoneUnmaskedRight.src = "https://i.imgur.com/kv5twnR.png"
    const BoneMaskedLeft = new Image();
    BoneMaskedLeft.src = "https://i.imgur.com/PO8NtHf.png?1"
    const BoneMaskedRight = new Image();
    BoneMaskedRight.src = "https://i.imgur.com/u4Zfi3I.png?1"
    const NoResponseLeft = new Image();
    NoResponseLeft.src = "https://i.imgur.com/N4NDGBm.png"
    const NoResponseRight = new Image();
    NoResponseRight.src = "https://i.imgur.com/Wmg6zem.png"

    this.state = {
        chartData:{
            datasets:[
                {
                    lineTension: 0,   //straight lines
                    data: [],
                    pointStyle: [AirUnMaskedLeft,AirUnMaskedLeft,AirUnMaskedLeft,AirUnMaskedLeft,AirUnMaskedLeft],
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
                }]
            }
        }
    }
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(freq, threshold) {
      //add the data to the datasets
      let chartData = this.state.chartData;
      let newLabels = chartData.labels;
      let datasets = chartData.datasets;
      let newData = chartData.datasets[0].data;
      newLabels.push(freq);
      console.log(newLabels);
      newData.push(threshold);
      console.log(newData);
      const newDataset = {
          ...this.state.chartData.datasets[0],
          data: newData
      }

      datasets.filter((item) => item !== this.state.chartData.datasets[0]);
      datasets.concat(newDataset);
      const updated = {
          ...chartData,
          labels: newLabels,
          datasets: datasets
      }
      console.log(updated);
      this.setState({chartData : updated});
  }

  render() {
    return (
        <HashRouter>
            <div>
                <h1>Quiz</h1>
                <div className="help">
                    <Popup trigger={<button className= "popup-trigger"> ?
                    </button>} modal>
                        <div className="grid-container">
                            <div className="grid-item"><strong>KEY</strong></div>
                            <div className="grid-item"><strong>RIGHT</strong></div>
                            <div className="grid-item"><strong>BINAURAL</strong></div>
                            <div className="grid-item"><strong>LEFT</strong></div>

                            <div className="grid-item">AC Unmasked</div>
                            <div className="grid=item"><img src=
                            "https://i.imgur.com/BtWXB20.png" title=
                            "source: imgur.com" width={13} height={13}/></div>
                            <div classNmae="grid-item"></div>
                            <div classNmae="grid-item"><img src=
                            "https://imgur.com/VqJdazw.png" title=
                            "source: imgur.com" width={10} height={10}/></div>

                            <div className="grid-item">AC Masked</div>
                            <div className="grid=item"><img src=
                            "https://i.imgur.com/PFXczIl.png" title=
                            "source: imgur.com" width={13} height={13}/></div>
                            <div classNmae="grid-item"></div>
                            <div classNmae="grid-item"><img src=
                            "https://i.imgur.com/6KrOAuH.png" title=
                            "source: imgur.com" width={12} height={12}/></div>

                            <div className="grid-item">BC Unmasked</div>
                            <div className="grid=item"><img src=
                            "https://i.imgur.com/kv5twnR.png" title=
                            "source: imgur.com" width={11} height={11}/></div>
                            <div classNmae="grid-item"></div>
                            <div classNmae="grid-item"><img src=
                            "https://i.imgur.com/2q2Nglb.png" title=
                            "source: imgur.com" width={11} height={11}/></div>

                            <div className="grid-item">BC Masked</div>
                            <div className="grid=item"><img src=
                            "https://i.imgur.com/u4Zfi3I.png?1" title=
                            "source: imgur.com" width={13} height={12}/></div>
                            <div classNmae="grid-item"></div>
                            <div classNmae="grid-item"><img src=
                            "https://i.imgur.com/PO8NtHf.png?1" title=
                            "source: imgur.com" width={13} height={12}/></div>

                            <div className="grid-item">No Response</div>
                            <div className="grid=item"><img src=
                            "https://i.imgur.com/Wmg6zem.png" title=
                            "source: imgur.com" width={13} height={13}/></div>
                            <div classNmae="grid-item"></div>
                            <div classNmae="grid-item"><img src=
                            "https://i.imgur.com/N4NDGBm.png" title=
                            "source: imgur.com" width={13} height={13}/></div>
                        </div>
                    </Popup>
                </div>
                <div className="chart">
                  <Line
                    height={300}
                    data = {this.generateSlopePoints}
                    redraw
                   />
                </div>
                <li><NavLink to="./Mode">Go back</NavLink></li>
                {/*<NavLink to="/input">Add a point</NavLink>*/}
            </div>
        </HashRouter>

    );
  }
}




export default Quiz
