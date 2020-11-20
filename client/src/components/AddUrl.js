import React from 'react';
import {  Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';

class AddUrl extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            url : '',
            seconds: 0.5,
            urlError:'',
            nameError : ''
        };

    }
    
    validateUrl(str)    
    {
        if (str.split(" ").length > 1)
            return false;
        const pattern =/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:16469\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

        return Boolean(pattern.test(str));
    } 

    validateName(str)    
    {
        if (str.length < 3)
            return false;
        return true;
    } 



    submitForm(e)
    {
        e.preventDefault();

        if (!this.validateUrl(this.state.url)  || !this.validateName(this.state.name))
        {
        this.setState({
            urlError : this.validateUrl(this.state.url) ? '' : 'Provide a valid url',
            nameError : !this.validateName(this.state.name) ? '' : 'Provide a valid Name' 
        });
        }
        else
        {
       this.props.addMonitor({
        name : this.state.name,   
        url : this.state.url,
        seconds : this.state.seconds
    })
    this.setState({
        name: '',
        url : '',
        seconds: 0.5,
        urlError:''
    })
   }
    }

    handleNameChange(event)
    {
        this.setState({
            name: event.target.value,
            nameError : this.validateName(event.target.value) ? '' : 'Provide a valid Name'
        });
    }

    handleUrlChange(event)
    {
        this.setState({
            url : event.target.value,
            urlError : this.validateUrl(event.target.value) ? '' : 'Provide a valid Url'
        });
    }

    handleSecondsChange(event)
    {
        this.setState({seconds: event.target.value});
    }


    render()
    {
        return (
            <div className="container">
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="Url" ><h5>Name:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="string" style={{height:"2rem"}} id="Name"
                                value={this.state.name} onChange={(e) => this.handleNameChange(e)} />
                             <FormText>
                                {this.state.nameError === '' ? null : <h6 >{this.state.nameError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup> 

                    <FormGroup row>
                        <Label className="col-4 text-center" for="Url" ><h5>URL:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="string" style={{height:"2rem"}} id="Url" placeholder="Give URL"
                                value={this.state.url} onChange={(e) => this.handleUrlChange(e)} />
                            <FormText>
                                {this.state.urlError === '' ? null : <h6 >{this.state.urlError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>

                    <FormGroup row>
                        <Label className="col-4 text-center" for="Seconds"><h5>Seconds:</h5></Label>
                        <div className="col-7">
                            <Input id="Seconds" type="range" min="0.5" max="10" value={this.state.seconds} 
                                onChange={(e) => this.handleSecondsChange(e)} step="0.5"/> 
                            {this.state.seconds} 
                        </div>
                    </FormGroup>


                    <FormGroup className="row p-4">
                        <div className="col-3 offset-7">
                            <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                                type = "submit" onClick={(e) => this.submitForm(e)}>Monitor</Button>
                        </div>
                    </FormGroup>
                </Form>
            
            </div>
        );
    } 
}


export default AddUrl;