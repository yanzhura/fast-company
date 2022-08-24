import React, { useEffect, useState } from 'react';
import { orderBy } from 'lodash';
import { paginate } from '../utils/utils';
import api from '../api';
import Pagination from './Pagination';
import Preloader from './Preloader';
import SearchStatus from './SearchStatus';
import UsersTable from './UsersTable';
import SearchBar from './SearchBar';
import GroupListSelect from './GroupListSelect';

const Users = () => {
    const PAGE_SIZE = 6;

    const [currentPage, setCurrentage] = useState(1);
    const [professions, setProfessions] = useState();
    const [filterProfession, setFilterProfession] = useState();
    const [filterUsername, setFilterUsername] = useState('');
    const [sort, setSort] = useState({ path: 'name', order: 'asc' });
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        if (filterProfession && filterProfession !== 'DEFAULT') {
            clearFilterUsername();
        }
    }, [filterProfession]);

    useEffect(() => {
        if (filterUsername) {
            clearFilterProfession();
        }
    }, [filterUsername]);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentage(1);
    }, [filterProfession]);

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

    const handlePageChange = (page) => {
        setCurrentage(page);
    };

    const handleItemSelect = (item) => {
        setFilterProfession(item);
    };

    const handleSort = (sortObject) => {
        setSort(sortObject);
    };

    const clearFilterProfession = () => {
        setFilterProfession('DEFAULT');
    };

    const handleFilterUsername = (event) => {
        const filterString = event.target.value.toLowerCase().trim();
        setFilterUsername(filterString);
    };

    const clearFilterUsername = () => {
        setFilterUsername('');
    };

    const filterUsers = (users) => {
        if (filterProfession && filterProfession !== 'DEFAULT') {
            return users.filter(
                (user) => user.profession.name === filterProfession
            );
        } else if (filterUsername) {
            return users.filter((user) =>
                user.name.toLowerCase().includes(filterUsername)
            );
        } else {
            return users;
        }
    };

    if (users) {
        const filteredUsers = filterUsers(users);
        const sortedUsers = orderBy(filteredUsers, sort.path, sort.order);
        const usersCrop = paginate(sortedUsers, currentPage, PAGE_SIZE);
        const pagesCount = Math.ceil(sortedUsers.length / PAGE_SIZE);

        if (pagesCount < currentPage && pagesCount > 0) {
            setCurrentage((prevCurrentPage) => prevCurrentPage - 1);
        }

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-3">
                        <SearchStatus usersNumber={filteredUsers.length} />
                    </div>
                    <div className="col-3"></div>
                    <div className="col-3">
                        <GroupListSelect
                            items={professions}
                            onItemSelect={handleItemSelect}
                            currentItem={filterProfession}
                            clearItem={clearFilterProfession}
                        />
                    </div>
                    <div className="col-3">
                        <SearchBar
                            filterUsername={filterUsername}
                            handleFilterUsername={handleFilterUsername}
                            clearFilterUsername={clearFilterUsername}
                        />
                    </div>
                </div>
                <div className="row">
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
                </div>
                <div className="row">
                    <div className="col  d-flex justify-content-end">
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
    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <Preloader />
            </div>
        </div>
    );
};

export default Users;
