import React, { useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import { loadQualitiesList } from './store/qualities';
import { loadUsersList } from './store/users';
import customHistory from './utils/customHistory';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadUsersList());
    }, []);

    return (
        <Router history={customHistory}>
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
        </Router>
    );
};

export default App;
