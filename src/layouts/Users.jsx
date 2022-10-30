import React from 'react';
import { useSelector } from 'react-redux';
import UserPage from '../components/pages/UserPage';
import UsersListPage from '../components/pages/UsersListPage';
import UsersLoader from '../components/ui/hoc/UsersLoader';
import UserProvider from '../hooks/useUsers';
import { getCurrentUserId } from '../store/users';

const Users = () => {
    const uid = useSelector(getCurrentUserId());
    return (
        <>
            <UsersLoader>
                <UserProvider>
                    {uid ? <UserPage uid={uid} /> : <UsersListPage />}
                </UserProvider>
            </UsersLoader>
        </>
    );
};

export default Users;
