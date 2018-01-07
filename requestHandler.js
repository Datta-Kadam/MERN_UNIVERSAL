"use strict";

import serialize from 'serialize-javascript';
import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
//import {match,RouterContext} from 'react-router';
import {StaticRouter} from 'react-router-dom';
import reducers from './src/reducers/index';
import routes from './src/routes';
//import { Redirect } from '../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-router';

function handleRender(req,res){
    axios.get('http://localhost:3001/books')
    .then((response)=>{
        //STEP1 - CREATE A REDUX STORE ON THE SERVER
        const store=createStore(reducers,{"books":{"books":response.data}})
        //STEP2 - GET THE INITIAL STATE FROM THE STORE
        const initialState=serialize(store.getState());
        //STEP3 - IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT CLIENT REQUESTS AND 
        //DEFINE WHAT TO DO WITH THEM.     
        const context={};
        console.log('How context looks like',req.url);
        const reactComponent=renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    {routes}
                </StaticRouter>
            </Provider>
        );

        if(context.url){
            //can use the context.status that we added in RedirectWithStatus
            redirect(context.status,context.url);
        }else{
            res.status(200).render('index',{reactComponent,initialState})
        }
    })
    .catch((err)=>{
        console.log('#Initial Server side rendering error',err);
    })
}

module.exports= handleRender;