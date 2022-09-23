import React from 'react';
import PropTypes from 'prop-types';
import Bookmark from '../common/Bookmark';
import Qualities from './Qualities';
import Table from '../common/table';
import { Link } from 'react-router-dom';
import Profession from './Profession';

const UsersTable = ({ users, onSort, selectedSort, onBookmark, onDelete }) => {
    const columns = {
        name: {
            name: 'Имя',
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: 'Качества',
            component: (user) => <Qualities qualities={user.qualities} />
        },
        profession: {
            name: 'Профессия',
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Закладка',
            component: (user) => (
                <Bookmark
                    isBookmarked={user.bookmark}
                    onBookmark={() => onBookmark(user._id)}
                />
            )
        },
        delete: {
            name: 'Удалить',
            component: (user) => (
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                        onDelete(user._id);
                    }}
                >
                    <i
                        className="bi bi-trash3"
                        style={{ fontSize: '1.1rem' }}
                    ></i>
                </button>
            )
        }
    };
    return (
        <Table
            selectedSort={selectedSort}
            onSort={onSort}
            columns={columns}
            data={users}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
