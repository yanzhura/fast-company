import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import RandomAvatar from '../common/RandomAvatar';

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <RandomAvatar
                    uid={currentUser._id}
                    gender={currentUser.gender}
                    size={40}
                />
            </div>
            <div className={'dropdown-menu w-100' + (isOpen ? ' show' : '')}>
                <Link
                    className="dropdown-item"
                    to={`/users/${currentUser._id}`}
                >
                    Профиль
                </Link>
                <Link className="dropdown-item" to="/logout">
                    Выход
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
