import React, { useState } from 'react';
import api from '../api';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const renderUserQualities = user => {
        return user.qualities.map(quality => {
            const badgeStyle = `badge bg-${quality.color} m-1`;
            return (
                <span key={quality._id} className={badgeStyle}>
                    {quality.name}
                </span>
            );
        });
    };

    const handleDeleteRow = id => {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
    };

    const tableRows = users.map(user => (
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>{renderUserQualities(user)}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                        handleDeleteRow(user._id);
                    }}>
                    <i className="gg-trash"></i>
                </button>
            </td>
        </tr>
    ));

    const getPhrase = () => {
        const lastDigit = Number(users.length.toString().at(-1));
        const preLastDigit = Number(users.length.toString().at(-2)) || 0;
        if (preLastDigit !== 1 && lastDigit >= 2 && lastDigit <= 4) {
            return 'человека';
        } else {
            return 'человек';
        }
    };

    const headerBadge = users.length ? (
        <h3>
            <div className="badge bg-primary m-2">
                {users.length} {getPhrase()} тусанёт с тобой сегодня
            </div>
        </h3>
    ) : (
        <h3>
            <div className="badge bg-danger m-2">Никто с тобой не тусанёт</div>
        </h3>
    );

    const usersTable = users.length > 0 && (
        <table className="table m-2">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>{tableRows}</tbody>
        </table>
    );

    return (
        <div>
            {headerBadge}
            {usersTable}
        </div>
    );
};

export default Users;
