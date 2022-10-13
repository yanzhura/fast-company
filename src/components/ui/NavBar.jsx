import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import NavProfile from './NavProfile';

const NavBar = () => {
    const { currentUser } = useAuth();

    return (
        <nav className="navbar shadow p-3">
            <div className="container-fluid">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">
                            Главная
                        </Link>
                    </li>
                    {currentUser && (
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
                    {currentUser ? (
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
