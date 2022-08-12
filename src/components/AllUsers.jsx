import React, { useEffect, useState } from 'react';
import { orderBy } from 'lodash';
import { paginate } from '../utils/utils';
import api from '../api';
import GroupList from './GroupList';
import Pagination from './Pagination';
import Preloader from './Preloader';
import SearchStatus from './SearchStatus';
import UsersTable from './UsersTable';

const Users = () => {
    const PAGE_SIZE = 6;

    const [currentPage, setCurrentage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sort, setSort] = useState({ path: 'name', order: 'asc' });
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

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentage(1);
    }, [selectedProf]);

    const handlePageChange = (page) => {
        setCurrentage(page);
    };

    const handleItemSelect = (item) => {
        setSelectedProf(item);
    };

    const handleSort = (sortObject) => {
        setSort(sortObject);
    };

    const clearFilter = () => {
        setSelectedProf(undefined);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession.name === selectedProf.name)
            : users;
        const sortedUsers = orderBy(filteredUsers, sort.path, sort.order);
        const usersCrop = paginate(sortedUsers, currentPage, PAGE_SIZE);
        const pagesCount = Math.ceil(sortedUsers.length / PAGE_SIZE);

        if (pagesCount < currentPage && pagesCount > 0) {
            setCurrentage((prevCurrentPage) => prevCurrentPage - 1);
        }

        return (
            <div className="d-flex">
                {professions ? (
                    <div className="d-flex flex-column flex-shrink-0 m-2">
                        <GroupList
                            items={professions}
                            onItemSelect={handleItemSelect}
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
                    {users.length > 0 ? (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sort}
                            onDelete={handleDeleteRow}
                            onBookmark={handleBookmark}
                        />
                    ) : (
                        ''
                    )}
                    <div className="d-flex justify-content-center">
                        {pagesCount > 1 ? (
                            <Pagination
                                pagesCount={pagesCount}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        );
    }
    return <Preloader />;
};

export default Users;
