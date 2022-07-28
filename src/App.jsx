import React, { useEffect, useState } from 'react';
import Users from './components/Users';
import api from './api';
import Preloader from './components/Preloader';

const App = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

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
            {users ? (
                <Users
                    allUsers={users}
                    onDelete={handleDeleteRow}
                    onBookmark={handleBookmark}
                />
            ) : (
                <Preloader />
            )}
        </div>
    );
};

export default App;
