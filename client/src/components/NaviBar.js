import React from 'react';
import {Navbar, NavbarBrand, NavbarToggler,
    Jumbotron, Collapse,} from 'reactstrap';

class NavigBar extends React.Component{
  
    constructor(props) {
        super(props);
    
        this.state = {
            isNavOpen: false,
        };

        this.toggleNav = this.toggleNav.bind(this);
   
        this.Items = [ 
            {
                content:"My Profile",
                link:"Home",
                icon:"user"
            },
            {
                content:"About Me",
                link:"About",
                icon:"info-circle"
            },
            {
                content:"My Promotions",
                link:"Promotions",
                icon:"film"
            },
            {
                content:"Have Fun",
                link:"Interact",
                icon:"gamepad"
            }
        ];
    }
   


    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

  
    render(){
        return (
            <>
                <Navbar dark expand="md">
                <div className="container">       
                
            </div>
                </Navbar>
                
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-md-8">
                                <h2><u>URL Monitor-Link</u></h2>
                                <p>***This URL is to check the response time and validate it... </p>
                                <p>***Designed by <b>SREEMAN NITHIK M</b> (The-Developer)...</p>
                            <p>***For more details contact me-<b>Ph.no:<u>[9600867511]</u></b>,

                            <a className="btn fa fa-envelope fa-lg" href="mailto:sreemanos1@gmail.com.com"> </a>
                            <a className="btn fa fa-linkedin fa-lg" href="https://www.linkedin.com/in/sreeman-nithik-m-b5a842163/"> </a>
                            <a className="btn fa fa-github fa-lg" href="https://github.com/sreemanos"> </a></p>
                            
                                
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </>
        );
    }
}

export default NavigBar;