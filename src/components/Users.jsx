import React from 'react';
import SearchStatus from './SearchStatus';
import User from './User';
import PropTypes from 'prop-types';

const Users = ({ users, onDelete, onBookmark, totalUsersCount }) => {
    const usersList = users.map((user) => (
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
                                style={{ fontSize: '1.1rem' }}
                            ></i>
                        </span>
                    </th>
                    <th scope="col">
                        <span className="badge bg-secondary">
                            <i
                                className="bi bi-trash3"
                                style={{ fontSize: '1.1rem' }}
                            ></i>
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>{usersList}</tbody>
        </table>
    );

    return (
        <div className="p-2">
            <SearchStatus usersNumber={totalUsersCount} />
            <div>{users.length > 0 ? usersTable : ''}</div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired,
    totalUsersCount: PropTypes.number.isRequired
};

export default Users;
