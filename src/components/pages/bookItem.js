"use strict";

import React from 'react';
import {Well,Grid,Row,Col,Button, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addToCart,updateCart} from '../../actions/cartActions';

class BookItem extends React.Component{  
    
    constructor(props){
        super(props);
        this.state={
            btnClicked:false
        }
    }

    onReadMore(){
        this.setState({btnClicked:true})
    }

    handleCart(){
        const book=[...this.props.cart,{
                _id:this.props.book._id,
                title:this.props.book.title,
                description:this.props.book.description,
                price:this.props.book.price,                
                quantity:1
            }]
        //Check if cart is empty
        if(this.props.cart.length>0){
            //CART IS NOT EMPTY
            let _id=this.props.book._id;
            const cartIndex= this.props.cart.findIndex(function(cart){
                return cart._id === _id;
            });
            //IF RETURN -1 THERE ARE NO CART ITEM
            if(cartIndex===-1){
                this.props.addToCart(book);
            }else{
                // WE NEED TO UPDATE QUANTITY
                this.props.updateCart(_id,1,this.props.cart);
            }            
        }
        else{
            this.props.addToCart(book);
        }
    }

    

    render(){
        return(
            <Well>
                <Row>
                    <Col xs={12} sm={4}>
                        <Image src={this.props.book.images} responsive/>
                    </Col>
                    <Col xs={12} sm={4}>
                        <div key={this.props.book._id}>
                            <h6>{this.props.book.title}</h6>
                            <p>
                                {
                                ((this.props.book.description.length>10) && (this.state.btnClicked===false))?
                                (this.props.book.description.substring(0,10)):(this.props.book.description)
                                }
                                <button className="link" onClick={this.onReadMore.bind(this)}>
                                 {((this.state.btnClicked === false) && (this.props.book.description!==null) && 
                                (this.props.book.description.length>10))?('...read more'):('')}
                                </button>
                            </p>
                            <h6>{this.props.book.price}</h6>
                            <Button onClick={this.handleCart.bind(this)} bsStyle="primary">Buy Now</Button>
                        </div>
                    </Col>
                </Row>                
            </Well>
        )
    }
}

function matchStateToProps(state){
    return{
        cart:state.cart.cart
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        addToCart:addToCart,
        updateCart:updateCart},
        dispatch)
}

export default connect(matchStateToProps,matchDispatchToProps)(BookItem) ;