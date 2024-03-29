import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import CommentsList from './CommentsList';
import Preloader from '../../common/Preloader';
import { getUserById } from '../../../store/users';
import { useSelector } from 'react-redux';

const UserPage = ({ uid }) => {
    const user = useSelector(getUserById(uid));
    return (
        <div>
            <div>
                {user ? (
                    <div className="container mt-5">
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <UserCard {...user} uid={uid} />
                            </div>
                            <div className="col-md-8">
                                <CommentsList />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex justify-content-between m-5">
                        <Preloader />
                    </div>
                )}
            </div>
        </div>
    );
};

UserPage.propTypes = {
    uid: PropTypes.string.isRequired
};

export default UserPage;
