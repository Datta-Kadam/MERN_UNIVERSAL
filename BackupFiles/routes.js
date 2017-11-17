
import React from 'react';
import {render} from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import {BrowserRouter,Switch} from 'react-router-dom';
import BooksList from './components/pages/booksList';
import BooksForm from './components/pages/booksForm';
import Cart from './components/pages/cart';
import Menu from './components/menu';
import Footer from './components/footer';


const Routes=(    
        <BrowserRouter>
            <div>
                <Menu />
                <Switch>
                    <Route exact path="/" component={BooksList} />
                    <Route exact path="/admin" component={BooksForm} />
                    <Route exact path="/cart" component={Cart} />
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
)
