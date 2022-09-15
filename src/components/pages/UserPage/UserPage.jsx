import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import UserCard from './UserCard';
import UserCardPreloader from '../../ui/UserCardPreloader';
import CommentsList from './CommentsList';

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
                    <div className="container mt-5">
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <UserCard {...userData} uid={uid} />
                            </div>
                            <div className="col-md-8">
                                <CommentsList />
                            </div>
                        </div>
                    </div>
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
