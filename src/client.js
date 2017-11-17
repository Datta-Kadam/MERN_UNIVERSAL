
import React from 'react';
import {render} from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {Provider} from 'react-redux';
import store from './store';
import routes from './routes';
import { BrowserRouter } from 'react-router-dom';

const Routes=(
    <Provider store={store}>
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    </Provider>
)

render(
       Routes, 
        document.getElementById('app')
    );


