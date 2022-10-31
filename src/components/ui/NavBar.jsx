import { Link } from 'react-router-dom';
import React from 'react';
import NavProfile from './NavProfile';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../store/users';

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="navbar shadow p-3">
            <div className="container-fluid">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">
                            Главная
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                aria-current="page"
                                to="/users"
                            >
                                Пользователи
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <div className="nav-item">
                            <Link
                                className="nav-link"
                                aria-current="page"
                                to="/login"
                            >
                                Вход
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
