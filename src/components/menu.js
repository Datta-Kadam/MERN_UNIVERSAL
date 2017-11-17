"use strict"

import React from 'react';
import {Nav,NavItem,Navbar,Badge} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCart} from '../../src/actions/cartActions';

class Menu extends React.Component{

    componentDidMount(){
     // this.props.getCart();
    }
  /*  calculateQuantity(){
      console.log('%%%%%%%%%%',this.props.cart.length)
      if(this.props.cart.length>1){
        const totalQuantity = this.props.cart.map(function(qty){
          return qty.quantity;
        }).reduce(function(a, b){//reduce it to sum of a + b
          return a + b;
        },0); 
        }else if(this.props.cart.length===1) {
          return this.props.cart.quantity;
        }else{
          return null;
        }
    }*/
    render(){        
          const totalQuantity = this.props.cart.map(function(qty){
            return qty.quantity;
           }).reduce(function(a, b){//reduce it to sum of a + b
            return a + b;
          },0); //start from index 0
        
        return(
        <Navbar inverse fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Shopping Cart</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="/about">About</NavItem>
                <NavItem eventKey={2} href="/contact">Contacts</NavItem>               
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="/admin">Admin</NavItem>
                <NavItem eventKey={2} href="/cart">Your Cart
                 {(totalQuantity>0)?(<Badge className="badge">
                 {totalQuantity}</Badge>):('')}                 
                 </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          )
    }
}

function mapStateToProps(state){
  return{
    cart:state.cart.cart
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
      getCart:getCart},
      dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu);