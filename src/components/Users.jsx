import React, { useEffect, useState } from 'react';
import SearchStatus from './SearchStatus';
import Pagination from '../components/Pagination';
import User from './User';
import PropTypes from 'prop-types';
import GroupList from './GroupList';
import api from '../api';
import { paginate } from '../utils/utils';
import Preloader from './Preloader';

const Users = ({ allUsers, onDelete, onBookmark }) => {
    const PAGE_SIZE = 3;

    const [currentPage, setCurrentage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentage(1);
    }, [selectedProf]);

    const onPageChange = (page) => {
        setCurrentage(page);
    };

    const onItemSelect = (item) => {
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf(undefined);
    };

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession.name === selectedProf.name)
        : allUsers;

    const usersCrop = paginate(filteredUsers, currentPage, PAGE_SIZE);
    const pagesCount = Math.ceil(filteredUsers.length / PAGE_SIZE);

    const usersList = usersCrop.map((user) => (
        <User
            key={user._id}
            {...user}
            onDelete={onDelete}
            onBookmark={onBookmark}
        />
    ));

    return (
        <div className="d-flex">
            {professions ? (
                <div className="d-flex flex-column flex-shrink-0 m-2">
                    <GroupList
                        items={professions}
                        onItemSelect={onItemSelect}
                        currentItem={selectedProf}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Сбросить фильтр
                    </button>
                </div>
            ) : (
                <Preloader />
            )}

            <div className="d-flex flex-column flex-grow-1 m-2">
                <SearchStatus usersNumber={filteredUsers.length} />
                {allUsers.length > 0 ? (
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
                ) : (
                    ''
                )}
                <div className="d-flex justify-content-center">
                    {pagesCount > 1 ? (
                        <Pagination
                            pagesCount={pagesCount}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    allUsers: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default Users;
