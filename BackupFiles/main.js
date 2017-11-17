"use strict"

import React from 'react';
import Menu from './components/menu';
import Footer from './components/footer';

import {connect} from 'react-redux';

class Main extends React.Component{
    
    render(){

        const totalQuantity = this.props.cart.map(function(qty){
            //console.log("Inside Total =",cartArr.price * cartArr.quantity)
             return qty.quantity;
         }).reduce(function(a, b){
             return a + b;
         },0); 

        return(<div>
                <Menu cartItemsNumber={totalQuantity}/>
                {this.props.children}
                <Footer />
            </div>
            )
    }
}

function mapStateToProps(state){
    return{cart:state.cart.cart }
}

export default connect(mapStateToProps)(Main);