import React, { useState } from 'react';
import Users from './components/Users';
import api from './api';
import Pagination from './components/Pagination';
import { paginate } from './utils/utils';

const App = () => {
    const PAGE_SIZE = 3;

    const [users, setUsers] = useState(api.users.fetchAll());
    const [currentPage, setCurrentage] = useState(1);

    const pagesCount = Math.ceil(users.length / PAGE_SIZE);
    const usersCrop = paginate(users, currentPage, PAGE_SIZE);

    const onPageChange = (page) => {
        setCurrentage(page);
    };

    const handleDeleteRow = (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    };

    const handleBookmark = (id) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                }
                return user;
            })
        );
    };

    return (
        <div>
            <Users
                users={usersCrop}
                totalUsersCount={users.length}
                onDelete={handleDeleteRow}
                onBookmark={handleBookmark}
            />
            <Pagination
                pagesCount={pagesCount}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default App;
