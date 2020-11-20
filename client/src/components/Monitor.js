import React, { Component } from 'react';
import { Button } from 'reactstrap';

import {hostname} from './hostname';

class Monitor extends Component {
  state = {
    url : '',
    name: '',
    seconds : 0.5,
    responses : [],
    work : true
    };

  setWork()
  {
    this.interval = setInterval(() => 
    {

      const config = {
         url: this.props.mon.url,
         name : this.props.mon.name,
         seconds : this.props.mon.seconds
      }
       const headers = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(config)
       };

          let {responses} =this.state;

           fetch(`${hostname}CheckResponse`, headers)
           .then(resp => resp.json())
           .then((data) => {

                   if (data.done)
                   {
                     responses.push({
                       success : "done",
                       createdAt : new Date().toISOString() 
                     });
                   }
               else
                   {
                     responses.push({
                       success : "time exceeded",
                       createdAt : new Date().toISOString() 
                     });
                   }
           })
           .catch( error => {
             responses.push({
               success : "Unvalid Url",
               createdAt : new Date().toISOString() 
             });
               console.error('There was an error!', error);
           })

           this.setState({
             responses 
         });

    }, 5000); 
    this.setState({work:true})
  }
  componentDidMount()
  {
     this.setState({
         url: this.props.mon.url,
         name : this.props.mon.name,
         seconds : this.props.mon.seconds,
         responses : this.props.mon.responses
     })
     this.setWork()

    } 

 stopWork()
 {
   clearInterval(this.interval);
   this.setState({ work : false})
 }
  componentWillUnmount()
    {
       this.stopWork();
    }

  render() 
  {
    const {name,url,seconds,responses,work} = this.state;
  return (
    <div>
       <div className="container">
           <div className="row">
             <div className="col-4">Name: {name}</div>
             <div className="col-5">URL: {url}</div>
             <div className="col-3">Response Time: {seconds}</div>
           </div>
           <div className="row">
             <div className="col-4">
           {work ? 
            <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}} onClick={() =>  this.stopWork()} >STOP</Button> :
            <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}} onClick={() =>  this.setWork()}>START</Button>}
            </div>

            </div>
         </div>
       {responses.length === 0 ? null :
       responses.map((resp,i) => {
         return(
           <div key={i} className="row">
             <div className="col-3">S.no: {i+1}</div>
             <div className="col-5">Time: {resp.createdAt}</div>
             <div className="col-4">result: {resp.success}</div>
           </div>
         )
       } )}
    </div>
  )
  }
}

export default Monitor;
