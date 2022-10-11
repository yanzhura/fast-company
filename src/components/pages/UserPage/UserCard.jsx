import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Qualities from '../../ui/Qualities';
import RandomAvatar from '../../common/RandomAvatar';
import { useAuth } from '../../../hooks/useAuth';

const UserCard = ({
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    uid,
    gender
}) => {
    const { currentUser } = useAuth();
    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    {currentUser._id === uid && (
                        <Link to={`/users/${uid}/edit`}>
                            <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                                <i className="bi bi-gear"></i>
                            </button>
                        </Link>
                    )}
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <RandomAvatar size={80} uid={uid} gender={gender} />
                        <div className="mt-3">
                            <h4>{name}</h4>
                            <p className="text-secondary mb-1">
                                {profession.name}
                            </p>
                            <div className="text-muted">
                                <i
                                    className="bi bi-caret-down-fill text-primary"
                                    role="button"
                                ></i>
                                <i
                                    className="bi bi-caret-up text-secondary"
                                    role="button"
                                ></i>
                                <span className="ms-2">{rate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Qualities</span>
                    </h5>
                    <p className="card-text">
                        <Qualities qualities={qualities} />
                    </p>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Completed meetings</span>
                    </h5>

                    <h1 className="display-1">{completedMeetings}</h1>
                </div>
            </div>
        </>
    );
};

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(['male', 'female', 'other']).isRequired
};

export default UserCard;
