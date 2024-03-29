import React, { useEffect, useState } from 'react';
import { orderBy } from 'lodash';
import { paginate } from '../../../utils/utils';
import Pagination from '../../common/Pagination';
import SearchStatus from '../../ui/SearchStatus';
import UsersTable from '../../ui/UsersTable';
import SearchBar from '../../ui/SearchBar';
import SelectField from '../../common/form/SelectField';
import PageSizeSelector from '../../ui/PageSizeSelector';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUsersList } from '../../../store/users';
import {
    getProfessions,
    getProfessionsLoadingStatus
} from '../../../store/professions';

const UsersListPage = () => {
    const [currentPage, setCurrentage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const professions = useSelector(getProfessions());
    const profIsLoading = useSelector(getProfessionsLoadingStatus());
    const [filterProfession, setFilterProfession] = useState('');
    const [filterUsername, setFilterUsername] = useState('');
    const [sort, setSort] = useState({ path: 'name', order: 'asc' });

    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());

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
        setCurrentage(1);
    }, [filterProfession]);

    const handleBookmark = (id) => {
        console.log('Bookmark set fot user', id);
    };

    const handlePageChange = (page) => {
        setCurrentage(page);
    };

    const handleItemSelect = ({ value }) => {
        setFilterProfession(value);
    };

    const handleSort = (sortObject) => {
        setSort(sortObject);
    };

    const clearFilterProfession = () => {
        setFilterProfession('');
    };

    const handleFilterUsername = (event) => {
        const filterString = event.target.value.toLowerCase().trim();
        setFilterUsername(filterString);
    };

    const clearFilterUsername = () => {
        setFilterUsername('');
    };

    const filterUsers = (users) => {
        const filteredCurrentUser = users.filter(
            (u) => u._id !== currentUserId
        );
        if (filterProfession) {
            return filteredCurrentUser.filter(
                (u) => u.profession === filterProfession._id
            );
        } else if (filterUsername) {
            return filteredCurrentUser.filter((u) =>
                u.name.toLowerCase().includes(filterUsername)
            );
        } else {
            return filteredCurrentUser;
        }
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(parseInt(newPageSize));
    };

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
                    {!profIsLoading && (
                        <SelectField
                            options={professions}
                            name="profession"
                            tip="Выберите профессию..."
                            value={filterProfession}
                            onChange={handleItemSelect}
                            onClear={clearFilterProfession}
                        />
                    )}
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
};

export default UsersListPage;
