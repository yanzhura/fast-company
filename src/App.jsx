import React, { useState } from 'react';
import Users from './components/Users';
import api from './api';

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDeleteRow = id => {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
    };

    const handleBookmark = id => {
        setUsers(prevUsers =>
            prevUsers.map(user => {
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
                users={users}
                onDelete={handleDeleteRow}
                onBookmark={handleBookmark}
            />
        </div>
    );
};

export default App;
