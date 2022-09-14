import React from 'react';
import PropTypes from 'prop-types';
// import userPicture from '../../../assets/user_picture.png';
import Qualities from '../../ui/Qualities';
// import BackButton from '../../common/BackButton';
import { Link } from 'react-router-dom';

const UserCard = ({
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    // bookmark
    uid
}) => {
    // const bookmarkStyle = bookmark ? 'bi-bookmark-fill' : 'bi-bookmark';

    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <Link to={`/users/${uid}/edit`}>
                        <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                            <i className="bi bi-gear"></i>
                        </button>
                    </Link>
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
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

    // return (
    //     <div className="card m-4" style={{ width: '25rem' }}>
    //         <div className="card-header d-flex justify-content-between">
    //             <h3>{name}</h3>
    //             <i
    //                 className={`bi ${bookmarkStyle}`}
    //                 style={{ fontSize: '1.5rem' }}
    //             ></i>
    //         </div>
    //         <img src={userPicture} className="card-img-top" alt="User" />
    //         <div className="card-body">
    //             <div className="container">
    //                 <div className="row">
    //                     <div className="col">
    //                         <p className="card-text text-muted">Профессия</p>
    //                     </div>
    //                     <div className="col">
    //                         <p className="card-text">{profession.name}</p>
    //                     </div>
    //                 </div>
    //                 <div className="row">
    //                     <div className="col">
    //                         <p className="card-text text-muted">Встречи</p>
    //                     </div>
    //                     <div className="col">
    //                         <p className="card-text">{completedMeetings}</p>
    //                     </div>
    //                 </div>
    //                 <div className="row">
    //                     <div className="col">
    //                         <p className="card-text text-muted">Рейтинг</p>
    //                     </div>
    //                     <div className="col">
    //                         <p className="card-text">{rate}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //             <br />
    //             <Qualities qualities={qualities} />
    //         </div>
    //         <div className="card-footer">
    //             <div className="d-flex justify-content-between">
    //                 <BackButton title="К списку пользователей" path="/users" />
    //                 <Link to={`/users/${uid}/edit`}>
    //                     <button
    //                         type="button"
    //                         className="btn btn-outline-secondary btn-sm"
    //                     >
    //                         <i className="bi bi-pencil-fill"></i>
    //                     </button>
    //                 </Link>
    //             </div>
    //         </div>
    //     </div>
    // );
};

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired
};

export default UserCard;
