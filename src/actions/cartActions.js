"use strict"

import axios from 'axios';

export function getCart(){
    return function(dispatch){
        axios.get('/api/cart')
        .then((response)=>{
            console.log('GET_CART_DATAA',response.data);
            dispatch({
                type:"GET_CART",
                payload:response.data
            })
        })
        .catch((err)=>{
            dispatch({
                type:"GET_CART_REJECTED",
                payload:err
            })
        })
    }
}

export function addToCart(cart){
    return function(dispatch){
        axios.post('/api/cart',cart)
        .then((response)=>{
            dispatch({
                type:"ADD_TO_CART",
                payload:response.data
            })
        })
        .catch((err)=>{
            dispatch({
                type:"ADD_TO_CART_REJECTED",
                payload:err
            })
        })
    }
}

//DELETE A CART ITEM
export function deleteCartItem(cart){

    return function(dispatch){
        axios.post('/api/cart',cart)
        .then((response)=>{
            dispatch({
                type:"DELETE_CART_ITEM",
                payload:response.data
            })
        })
        .catch((err)=>{
            dispatch({
                type:"DELETE_CART_ITEM_REJECTED",
                payload:err
            })
        })
    }

}

//UPDATE A CART ITEM
export function updateCart(_id,unit,cart){  
    console.log('&&&&&&',_id,unit,cart)  ;
    const currentCartToUpdate=cart;   
    const indexToUpdate=currentCartToUpdate.findIndex(function(cartItem){
        return cartItem._id===_id;
    });         
    const newCartToUpdate={...currentCartToUpdate[indexToUpdate],
                             quantity:currentCartToUpdate[indexToUpdate].quantity+unit};    
    let cartUpdate=[...currentCartToUpdate.slice(0,indexToUpdate),newCartToUpdate,
            ...currentCartToUpdate.slice(indexToUpdate+1)];
       
       return function(dispatch){
        axios.post('/api/cart',cartUpdate)
        .then((response)=>{
            console.log('Response data valyue-->',response.data)
            dispatch({
                type:"UPDATE_CART",
                payload:response.data
            })
        })
        .catch((err)=>{
            dispatch({
                type:"UPDATE_CART_REJECTED",
                payload:err
            })
        })
    }    
}