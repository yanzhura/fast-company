import React from 'react';
import { useParams } from 'react-router-dom';
import SingleUser from '../components/SingleUser';
import AllUsers from '../components/AllUsers';

const Users = () => {
    const params = useParams();
    const uid = params.uid;

    return <div>{uid ? <SingleUser uid={uid} /> : <AllUsers />}</div>;
};

export default Users;
