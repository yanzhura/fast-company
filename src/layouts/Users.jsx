import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/pages/UserPage';
import UsersListPage from '../components/pages/UsersListPage';

const Users = () => {
    const params = useParams();
    const uid = params.uid;

    return <div>{uid ? <UserPage uid={uid} /> : <UsersListPage />}</div>;
};

export default Users;
