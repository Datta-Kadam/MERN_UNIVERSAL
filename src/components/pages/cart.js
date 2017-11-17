"use strict";

import React from 'react';
import {connect} from 'react-redux';
import{Modal,Panel,Row,Col,Well,Button,ButtonGroup}from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem,updateCart,getCart} from '../../actions/cartActions'


class Cart extends React.Component{
    constructor(){
        super();
        this.state={
            showModal:false
        }
    }

    componentDidMount(){
        this.props.getCart();
    }

    open(){
        this.setState({
            showModal:true
        })
    }

    close(){
        this.setState({
            showModal:false
        })
    }

    onDelete(_id){
        
        const currentBookToDelete =  this.props.cart;
        // Determine at which index in books       array is the book to be deleted
        const indexToDelete =  currentBookToDelete.findIndex( function(cart){
        return cart._id === _id;
        }
        )
        //use slice to remove the book at the specified index
        let cartAfterDelete =
        [...currentBookToDelete.slice(0,        indexToDelete),
                    ...currentBookToDelete.slice(indexToDelete +  1)]
        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id){
        this.props.updateCart(_id,1,this.props.cart);
    }
    onDecrement(_id,quantity){
        if(quantity>1){
           this.props.updateCart(_id,-1,this.props.cart);
        }        
    }
    render(){
        if(this.props.cart[0]){
            return this.renderCart();
        }else{
            return this.renderEmpty();
        }       
    }
   
    renderEmpty(){
        return(<div></div>);
    }
    renderCart(){ 
        const totalAmount = this.props.cart.map(function(cartArr){
            //console.log("Inside Total =",cartArr.price * cartArr.quantity)
             return cartArr.price * cartArr.quantity;
         }).reduce(function(a, b){
             return a + b;
         },0).toFixed(2); // start summing from index 0
     
         const totalQuantity = this.props.cart.map(function(qty){
            //console.log("Inside Total =",cartArr.price * cartArr.quantity)
             return qty.quantity;
         }).reduce(function(a, b){
             return a + b;
         },0); // start summing from index 0
      

        
            const cartItemsList=this.props.cart.map(function(cartArr){
                console.log('next to show cart, price value==>',cartArr.price)
            return(    
                    <Panel key={cartArr._id}>
                        <Row>
                            <Col xs={12} sm={4}>
                                <h6>{cartArr.title}</h6><span>    </span>
                            </Col>
                            <Col xs={12} sm={4}>
                                <h6>usd. {cartArr.price}</h6>
                            </Col>
                            <Col xs={12} sm={4}>
                                <h6>Qty. <label bsStyle="success">{cartArr.quantity}</label></h6>
                            </Col>
                            <Col xs={6} sm={4}>
                                <ButtonGroup>
                                    <Button onClick={this.onDecrement.bind(this,cartArr._id,cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                                    <Button onClick={this.onIncrement.bind(this,cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                                    <span>     </span>
                                    <Button onClick={this.onDelete.bind(this,cartArr._id)} bsStyle="danger" bsSize="small">DELETE</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Panel>
                )
            },this);   

        return(
            <Panel header="Cart" bsStyle="primary">            
                {cartItemsList}
                <Row>
                    <Col xs={12}>
                        <h6>Total Amount:{totalAmount}</h6>
                        <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
                            PROCEED TO CHECKOUT
                        </Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank you !</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your Order han been saved</h6>
                        <p>you will receive email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <p>Total $: {totalAmount}</p>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>                
            </Panel>
            )
    }
 }

function mapStateToProps(state){
    return{ cart:state.cart.cart}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCartItem:deleteCartItem,
        updateCart:updateCart,
        getCart:getCart},
        dispatch)
}

export function totals(payloadArr){    
    console.log("COMING FROM TOTAL", payloadArr)
   const totalAmount = payloadArr.map(function(cartArr){
       console.log("Inside Total =",cartArr.price * cartArr.quantity)
        return cartArr.price * cartArr.quantity;
    }).reduce(function(a, b){
        return a + b;
    },0); // start summing from index 0

    return {amount:totalAmount.toFixed(2)};
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);