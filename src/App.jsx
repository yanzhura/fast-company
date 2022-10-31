import React from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import Login from './layouts/Login';
import Logout from './layouts/Logout';
import Main from './layouts/Main';
import NavBar from './components/ui/NavBar';
import NotFound from './components/pages/NotFound';
import Users from './layouts/Users';
import UserEdit from './components/pages/UserEdit';
import { ToastContainer } from 'react-toastify';
import ProfessionProvider from './hooks/useProfessions';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/ProtectedRoute';
import customHistory from './utils/customHistory';
import AppLoader from './components/ui/hoc/AppLoader';

const App = () => {
    return (
        <Router history={customHistory}>
            <AppLoader>
                <AuthProvider>
                    <NavBar />
                    <ProfessionProvider>
                        <Switch>
                            <Route path="/" exact component={Main} />
                            <Route path="/login/:type?" component={Login} />
                            <ProtectedRoute
                                path="/users/:uid?"
                                exact
                                component={Users}
                            />
                            <ProtectedRoute
                                path="/users/:uid?/edit"
                                component={UserEdit}
                            />
                            <Route path="/not_found" component={NotFound} />
                            <Route path="/logout" component={Logout} />
                            <Redirect to="/not_found" />
                        </Switch>
                    </ProfessionProvider>
                    <ToastContainer />
                </AuthProvider>
            </AppLoader>
        </Router>
    );
};

export default App;
