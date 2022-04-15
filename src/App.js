import React from 'react';
import BarChart from './components/BarChart';
import Safety from "./redux/safety"
import Action4 from "./redux/Action4"
import Header from './components/HeaderComponent';
import City from './components/CityComponent';
import Welcome from "./redux/Welcome";

const {SAFETY} = require('./data/safetyIndex.js');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
      dataNow: [...SAFETY],
      userLoggedIn: 0
    };
    this.handleCallback = (childData) => {
      this.setState({dataNow: childData})
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
  }
  handleClick(event) {
    if(event) {
      this.setState({dataNow: event})
    }
  }
  handleClick2(event) {
    if(event) {
      this.setState({userLoggedIn: event})
    }
  }

  handleChange(e) {
    this.setState({filter: e.target.value})
  }

  render() {
    return (
      <div className="Container" style={{display:'flex', flexDirection:'column', alignItems:'center', width: '100%'}}>
        <div>
            {this.state.userLoggedIn === 0 && <div><Header handleCallback = {(userLoggedIn) => {this.handleClick2(userLoggedIn)}} /></div>}
            {this.state.userLoggedIn === 1 && <div><Welcome handleCallback = {(userLoggedIn) => {this.handleClick2(userLoggedIn)}} /></div>} 
        </div> 
        <div style={{textAlign: 'center', marginTop: 10}}>
            <p>
            Hello and welcome to my travel app.
            <br/>
            Here I'll go over some import info for choosing your next trip.
            <br/>
            First let's talk about safety.  You don't want your trip ruined by crime etc.
            <br/>
            Below is a chart of countries ranked by safety.  This data comes from <a href="https://www.travelsafe-abroad.com/countries/" target="_blank" rel="noreferrer noopener">Travelsafe-abroad.com</a>
            <br/>
            You can filter this data by setting a minimum safety rating, or login and create your own country ratings.
            </p>
        </div>
        <div>
          Chart Minimum Safety Threshold: <input value={this.state.filter} onChange={this.handleChange} label="Filter Threshold"/>
        </div>
        <div className='col-12'><BarChart data={this.state.dataNow} filterNow={this.state.filter} key={this.state.filter} /></div>
        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>  
          {this.state.userLoggedIn === 1 && <div><Action4 handleCallback = {(dataNow) => {this.handleClick(dataNow)}} /></div>}
          {this.state.userLoggedIn === 1 && <div><Safety /></div>}
        </div>
        <div className='col-12'><City /></div>
      </div>


    );
  }
}

export default App;
