import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './layouts/Login';
import Main from './layouts/Main';
import NavBar from './components/ui/NavBar';
import NotFound from './components/pages/NotFound';
import Users from './layouts/Users';
import UserEdit from './components/pages/UserEdit';

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:uid?" exact component={Users} />
                <Route path="/users/:uid?/edit" component={UserEdit} />
                <Route path="/not_found" component={NotFound} />
                <Redirect to="/not_found" />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
