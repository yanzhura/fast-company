import React, { useState } from 'react';
import SearchStatus from './SearchStatus';
import User from './User';

const Users = ({ users, onDelete, onBookmark }) => {
    const usersList = users.map(user => (
        <User
            key={user._id}
            {...user}
            onDelete={onDelete}
            onBookmark={onBookmark}
        />
    ));

    const usersTable = (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">
                        <span className="badge bg-secondary">
                            <i
                                className="bi bi-bookmark-fill"
                                style={{ fontSize: '1.1rem' }}></i>
                        </span>
                    </th>
                    <th scope="col">
                        <span className="badge bg-secondary">
                            <i
                                className="bi bi-trash3"
                                style={{ fontSize: '1.1rem' }}></i>
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>{usersList}</tbody>
        </table>
    );

    return (
        <div className="p-2">
            <SearchStatus usersNumber={users.length} />
            <div>{users.length > 0 ? usersTable : ''}</div>
        </div>
    );
};

export default Users;
