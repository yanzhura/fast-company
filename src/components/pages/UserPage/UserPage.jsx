import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import UserCard from '../../ui/UserCard';
import UserCardPreloader from '../../ui/UserCardPreloader';

const UserPage = ({ uid }) => {
    const [userData, setUserData] = useState(undefined);

    useEffect(() => {
        api.users.getById(uid).then((data) => {
            setUserData(data);
        });
    }, []);

    return (
        <div>
            <div>
                {userData ? (
                    <UserCard {...userData} uid={uid} />
                ) : (
                    <UserCardPreloader />
                )}
            </div>
        </div>
    );
};

UserPage.propTypes = {
    uid: PropTypes.string.isRequired
};

export default UserPage;
