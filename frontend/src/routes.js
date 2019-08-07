import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Login from './pages/login';
import Main from './pages/main';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/main" component={Main}/>
        </BrowserRouter>
    );
};

export default Routes;
