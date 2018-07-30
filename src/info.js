import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import './style.css';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

class Info extends Component {
  goBack() {
      window.history.back();
  }

  render() {
    return (
      <div className="App">
        <div className="carousel">

          <Carousel swipeable ={true} emulateTouch = {true} showThumbs = {false}>
                  <div>
                    <img src="https://i.imgur.com/tqrErnB.png" title="source: imgur.com" />
                  </div>
                  <div>
                    <img src="https://i.imgur.com/FpIxsLq.png" title="source: imgur.com" />
                  </div>
                  <div>
                    <img src="https://i.imgur.com/o193kaL.png" title="source: imgur.com" />
                  </div>
  				        <div>
                    <img src="https://i.imgur.com/NS1XirV.png" title="source: imgur.com" />
                  </div>
                  <div>
                    <img src="https://i.imgur.com/B7eILal.png" title="source: imgur.com" />
                  </div>
              </Carousel>
            </div>
            <header className="App-header">
                <div className="bannerInfo">
                  <button onClick={this.goBack}><img height={20} src="https://i.imgur.com/ccR1498.png" /></button>
                  <h2 id="pageHeading">More info</h2>
                </div>
            </header>
		<h2>Masking</h2>
		<article>
			Masking is a procedure audiologists
			use while testing to separate the two ears, acoustically.
			You separate them by covering one then testing the other to
			determine if it is normal or impaired. In audiology noise
			is used as the masker.
			<h3> Step by step </h3>
			<ul>
				<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
				<li>Fusce et gravida ex. Cras semper ligula ante, et convallis </li>
				<li>tortor pulvinar et. Vestibulum elementum id libero condimentum </li>
				<li>tincidunt. Nulla sit amet enim eu mi fringilla cursus. </li>
				<li>Fusce at massa quis ante convallis rutrum a et arcu. Phasellus </li>
			</ul>
		</article>
      </div>
    );
  }
}
export default Info;
