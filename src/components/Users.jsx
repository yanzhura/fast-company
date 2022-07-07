import React, { useState } from 'react';
import api from '../api';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const renderUserQualities = qualities => {
        return qualities.map(quality => {
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
            <td>{renderUserQualities(user.qualities)}</td>
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
            return 'человека тусанут';
        } else {
            return 'человек тусанёт';
        }
    };

    const badgePhrase = users.length
        ? `${users.length} ${getPhrase()} с тобой сегодня`
        : 'Никто с тобой не тусанёт';

    const usersTable =
        users.length > 0 ? (
            <table className="table">
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
        ) : (
            ''
        );

    return (
        <div className="p-2">
            <h3>
                <div
                    className={
                        'badge ' + (users.length ? 'bg-primary' : 'bg-danger')
                    }>
                    {badgePhrase}
                </div>
            </h3>
            {usersTable}
        </div>
    );
};

export default Users;
