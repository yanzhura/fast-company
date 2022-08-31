import React, { useEffect, useState } from 'react';
import { orderBy } from 'lodash';
import { paginate } from '../../../utils/utils';
import api from '../../../api';
import Pagination from '../../common/Pagination';
import Preloader from '../../common/Preloader';
import SearchStatus from '../../ui/SearchStatus';
import UsersTable from '../../ui/UsersTable';
import SearchBar from '../../ui/SearchBar';
import SelectInput from '../../common/form/SelectInput';
import PageSizeSelector from '../../ui/PageSizeSelector';

const UsersListPage = () => {
    const [currentPage, setCurrentage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
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

    const handleItemSelect = ({ target }) => {
        setFilterProfession(target.value);
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
                (user) => user.profession._id === filterProfession
            );
        } else if (filterUsername) {
            return users.filter((user) =>
                user.name.toLowerCase().includes(filterUsername)
            );
        } else {
            return users;
        }
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(parseInt(newPageSize));
    };

    if (users) {
        const filteredUsers = filterUsers(users);
        const sortedUsers = orderBy(filteredUsers, sort.path, sort.order);
        let usersCrop;
        let pagesCount;

        if (pageSize !== 0) {
            usersCrop = paginate(sortedUsers, currentPage, pageSize);
            pagesCount = Math.ceil(sortedUsers.length / pageSize);
        } else {
            usersCrop = users;
            pagesCount = 1;
        }

        if (pagesCount < currentPage && pagesCount > 0) {
            setCurrentage((prevCurrentPage) => prevCurrentPage - 1);
        }

        return (
            <div className="container mt-5">
                <div className="row mb-2">
                    <div className="col-3">
                        <SearchStatus usersNumber={filteredUsers.length} />
                    </div>
                    <div className="col-3"></div>
                    <div className="col-3">
                        <SelectInput
                            options={professions}
                            tip="Выберите профессию..."
                            currentItem={filterProfession}
                            onItemSelect={handleItemSelect}
                            onClear={clearFilterProfession}
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
                    <div className="col-10">
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
                    <div className="col-2">
                        <PageSizeSelector
                            pageSize={pageSize}
                            onPageSizeChange={handlePageSizeChange}
                        />
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

export default UsersListPage;
