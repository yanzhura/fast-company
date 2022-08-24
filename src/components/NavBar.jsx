import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const pages = [
        { id: 1, path: '/', title: 'Главная' },
        { id: 2, path: '/login', title: 'Вход' },
        { id: 3, path: '/users', title: 'Пользователи' }
    ];

    const location = useLocation();
    const [currentPath, setCurrentPath] = useState('/');

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]);

    const navLinks = pages.map((link) => {
        const isActive = currentPath === link.path ? 'active' : '';

        return (
            <li className="nav-item" key={link.id}>
                <Link
                    className={`nav-link ${isActive}`}
                    aria-current="page"
                    to={link.path}
                >
                    {link.title}
                </Link>
            </li>
        );
    });

    return (
        <div className="shadow p-3">
            <ul className="nav nav-pills">{navLinks}</ul>
        </div>
    );
};

export default NavBar;
