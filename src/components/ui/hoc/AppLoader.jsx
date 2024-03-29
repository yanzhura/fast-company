import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loadQualitiesList } from '../../../store/qualities';
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList
} from '../../../store/users';
import Preloader from '../../common/Preloader';
import { loadProfessionsList } from '../../../store/professions';

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);
    return <>{usersStatusLoading ? <Preloader /> : children}</>;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
