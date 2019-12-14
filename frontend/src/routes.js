import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Login from './pages/login';
import Dev from './pages/dev';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/dev/:id" component={Dev}/>
        </BrowserRouter>
    );
};

export default Routes;
