"use strict";

import {applyMiddleware,createStore} from 'redux';
//Import combined reducers
import reducers from './reducers/index';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

//CRETAE A LOGGER MIDDLEWARE
const middleware=applyMiddleware(thunk,logger);

//FOR UNIVERSAL APP , GET THE INITIAL STATE FROM THE SERVER so that Initial state and html would be served
//togather to the client instead of just api response in earlier case.//
const initialState=window.INITIAL_STATE;
//APPLY LOGGER MIDDLEWARE
const store=createStore(reducers,initialState,middleware);

export default store;