import React from 'react';
import userPicture from '../../assets/user_picture.png';

const UserCardPreloader = () => {
    return (
        <div className="card m-4" style={{ width: '25rem' }}>
            <div className="card-header placeholder-glow d-flex justify-content-between">
                <h3 className="placeholder col-6"></h3>
                <h3 className="placeholder col-1"></h3>
            </div>
            <img src={userPicture} className="card-img-top" alt="User" />
            <div className="card-body">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="card-text text-muted">Профессия</p>
                        </div>
                        <div className="col">
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p className="card-text text-muted">Встречи</p>
                        </div>
                        <div className="col">
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p className="card-text text-muted">Рейтинг</p>
                        </div>
                        <div className="col">
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                            </p>
                        </div>
                    </div>
                </div>
                <br />
                <div className="card-text placeholder-glow">
                    <span className="placeholder col-10"></span>
                </div>
            </div>
            <div className="card-footer">
                <div className="card-text placeholder-glow">
                    <span className="placeholder col-12"></span>
                </div>
            </div>
        </div>
    );
};

export default UserCardPreloader;
