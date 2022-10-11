import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Preloader from '../components/common/Preloader';
import userService from '../services/user.service';
import { toast } from 'react-toastify';

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setisLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function getUserById(userId) {
        return users.find((user) => user._id === userId);
    }

    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
    };

    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? (
                children
            ) : (
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center">
                        <Preloader />
                    </div>
                </div>
            )}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
