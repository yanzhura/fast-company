import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/pages/UserPage';
import UsersListPage from '../components/pages/UsersListPage';
import UsersLoader from '../components/ui/hoc/UsersLoader';

const Users = () => {
    const { uid } = useParams();
    return (
        <>
            <UsersLoader>
                {uid ? <UserPage uid={uid} /> : <UsersListPage />}
            </UsersLoader>
        </>
    );
};

export default Users;
