"use strict"

import {combineReducers} from 'redux';

import {booksReducers} from './booksReducers';
import {cartReducers} from './cardReducers';


export default combineReducers ({
    books:booksReducers,
    cart:cartReducers
})