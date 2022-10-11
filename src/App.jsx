import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './layouts/Login';
import Logout from './layouts/Logout';
import Main from './layouts/Main';
import NavBar from './components/ui/NavBar';
import NotFound from './components/pages/NotFound';
import Users from './layouts/Users';
import UserEdit from './components/pages/UserEdit';
import { ToastContainer } from 'react-toastify';
import ProfessionProvider from './hooks/useProfessions';
import QualityProvider from './hooks/useQualities';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/ProtectedRoute';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NavBar />
                <ProfessionProvider>
                    <QualityProvider>
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
                    </QualityProvider>
                </ProfessionProvider>
                <ToastContainer />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
