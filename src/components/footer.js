"use strict"

import React from 'react';
import {Nav,NavItem,Navbar,Badge} from 'react-bootstrap';

class Footer extends React.Component{
    render(){
        return(
            <footer className="footer text-center">
                <div className="container">
                    <p className="text-center">Copyright 2017 Bookshop. All right reserved</p>
                </div>
            </footer>
          )
    }
}

export default Footer;