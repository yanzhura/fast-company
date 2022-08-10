import React from 'react';
import PropTypes from 'prop-types';
import userPicture from '../assets/user_picture.png';
import Qualities from './Qualities';
import BackButton from './BackButton';

const UserCard = ({
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark
}) => {
    const bookmarkStyle = bookmark ? 'bi-bookmark-fill' : 'bi-bookmark';

    return (
        <div className="card" style={{ width: '22rem' }}>
            <div className="card-header d-flex justify-content-between">
                <h3>{name}</h3>
                <i
                    className={`bi ${bookmarkStyle}`}
                    style={{ fontSize: '1.5rem' }}
                ></i>
            </div>
            <img src={userPicture} className="card-img-top" alt="User" />
            <div className="card-body">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="card-text text-muted">Профессия</p>
                        </div>
                        <div className="col">
                            <p className="card-text">{profession.name}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p className="card-text text-muted">Встречи</p>
                        </div>
                        <div className="col">
                            <p className="card-text">{completedMeetings}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p className="card-text text-muted">Рейтинг</p>
                        </div>
                        <div className="col">
                            <p className="card-text">{rate}</p>
                        </div>
                    </div>
                </div>
                <br />
                <Qualities qualities={qualities} />
            </div>
            <div className="card-footer">
                <BackButton title="К списку пользователей" path="/users" />
            </div>
        </div>
    );
};

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired
};

export default UserCard;
