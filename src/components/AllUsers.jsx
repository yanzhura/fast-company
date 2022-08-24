import React, { useEffect, useState } from 'react';
import { orderBy } from 'lodash';
import { paginate } from '../utils/utils';
import api from '../api';
import GroupList from './GroupList';
import Pagination from './Pagination';
import Preloader from './Preloader';
import SearchStatus from './SearchStatus';
import UsersTable from './UsersTable';
import SearchBar from './SearchBar';

const Users = () => {
    const PAGE_SIZE = 6;

    const [currentPage, setCurrentage] = useState(1);
    const [professions, setProfessions] = useState();
    const [filterProfession, setFilterProfession] = useState();
    const [filterUsername, setFilterUsername] = useState('');
    const [filter, setFilter] = useState();
    const [sort, setSort] = useState({ path: 'name', order: 'asc' });
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        if (filterProfession) {
            setFilterUsername('');
            setFilter('profession');
        } else if (filterUsername) {
            setFilterProfession();
            setFilter('name');
        } else {
            setFilter();
        }
    }, [filterProfession, filterUsername]);

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
    }, [filterProfession]);

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
        setFilterProfession();
        setFilter();
    };

    const handleFilterUsername = (event) => {
        const filterString = event.target.value.toLowerCase().trim();
        setFilterUsername(filterString);
    };

    const clearFilterUsername = () => {
        setFilterUsername('');
        setFilter();
    };

    const filterUsers = (users, filterType) => {
        console.log('filter :>> ', filter);
        console.log('filterProfession :>> ', filterProfession);
        console.log('filterUsername :>> ', filterUsername);
        if (filterType === 'profession') {
            return users.filter(
                (user) => user.profession.name === filterProfession.name
            );
        } else if (filterType === 'name') {
            return users.filter((user) =>
                user.name.toLowerCase().includes(filterUsername)
            );
        } else {
            return users;
        }
    };

    if (users) {
        const filteredUsers = filterUsers(users, filter);
        const sortedUsers = orderBy(filteredUsers, sort.path, sort.order);
        const usersCrop = paginate(sortedUsers, currentPage, PAGE_SIZE);
        const pagesCount = Math.ceil(sortedUsers.length / PAGE_SIZE);

        if (pagesCount < currentPage && pagesCount > 0) {
            setCurrentage((prevCurrentPage) => prevCurrentPage - 1);
        }

        return (
            <div className="container-fluid m-2">
                <div className="row">
                    <SearchStatus usersNumber={filteredUsers.length} />
                </div>
                <div className="row">
                    <div className="col-3">
                        {professions ? (
                            <div>
                                <GroupList
                                    items={professions}
                                    onItemSelect={handleItemSelect}
                                    currentItem={filterProfession}
                                />
                                <button
                                    className="btn btn-secondary mt-2"
                                    onClick={clearFilterProfession}
                                >
                                    Сбросить фильтр
                                </button>
                            </div>
                        ) : (
                            <Preloader />
                        )}
                    </div>
                    <div className="col-9">
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
                <div className="row justify-content-center">
                    <div className="col-1">
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
