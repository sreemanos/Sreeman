import React, { Component } from 'react';
import './App.css';
import NaviBar from './components/NaviBar';
import AddUrl from './components/AddUrl';
import Monitor from './components/Monitor';
import {hostname} from './components/hostname';


class App extends Component {
  state = {
        monitors : []
    };
 
  addMonitor = (constraints) =>  {
    let {monitors} = this.state;
    monitors.push({
      url : constraints.url,
      name: constraints.name,
      seconds : constraints.seconds,
      responses : []
    })
    this.setState({
      monitors 
    })
  }

  componentDidMount()
  {
    const headers = {
      method: 'GET'
  }
  fetch(`${hostname}GetMonitors`, headers)

  .then(resp => resp.json())

  .then((data) => {
  this.setState({
      monitors : data
    })
  })
  .catch( error => {
      console.error('There was an error!', error);
  })

  }

  render() {
    const {monitors} = this.state;
  return (
    <div className="App">
      <NaviBar />
       <AddUrl addMonitor={this.addMonitor}/>
       <div className="container">
      <div className="row">
       {monitors.length === 0 ? null :
       monitors.map((mon,i) => {
         return(
         <div key={i}><Monitor className="col-6" mon = {mon} /></div>
         )
       } )}</div></div>
    </div>
  )
  }
}

export default App;
