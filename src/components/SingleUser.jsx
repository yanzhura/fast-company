import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api';
// import Preloader from './Preloader';
import UserCard from './UserCard';
import UserCardPreloader from './UserCardPreloader';

const SingleUser = ({ uid }) => {
    const [userData, setUserData] = useState(undefined);

    useEffect(() => {
        api.users.getById(uid).then((data) => {
            setUserData(data);
        });
    }, []);

    return (
        <div className="m-2">
            <div>{userData ? <UserCard {...userData} /> : <UserCardPreloader />}</div>
        </div>
    );
};

SingleUser.propTypes = {
    uid: PropTypes.string.isRequired
};

export default SingleUser;
