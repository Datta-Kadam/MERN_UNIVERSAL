"use strict"

//CART REDUCERS
export function cartReducers(state = {cart:[]},action){
    switch (action.type) {       
        case "GET_CART":
            return {...state,cart:action.payload}
            break;
        case "ADD_TO_CART":
            return {...state,cart:action.payload}
            break;
        case "DELETE_CART_ITEM":    
            return {...state,cart:action.payload}
            break;
        case "UPDATE_CART":   
            //console.log("UPDATE_CART_STATE",...state);        
            return {...state,cart:action.payload}
            break;
        default:
            return state;
            break;
    }
    return state;
}
