import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/pages/UserPage';
import UsersListPage from '../components/pages/UsersListPage';
import UserProvider from '../hooks/useUsers';

const Users = () => {
    const { uid } = useParams();

    return (
        <>
            <UserProvider>
                {uid ? <UserPage uid={uid} /> : <UsersListPage />}
            </UserProvider>
        </>
    );
};

export default Users;
