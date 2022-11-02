import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import professionService from '../services/profession.service';
import { toast } from 'react-toastify';

const ProfessionContext = React.createContext();

export const useProfession = () => {
    return useContext(ProfessionContext);
};

const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfessionsList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getProfessionsList() {
        try {
            const { content } = await professionService.fetchAll();
            setProfessions(content);
            setisLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    const getProfession = (id) => {
        return professions.find((p) => p._id === id);
    };

    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
    };

    return (
        <ProfessionContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProfessionProvider;
