import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qualityService from '../services/quality.service';
import { toast } from 'react-toastify';

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState(true);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQualitiesList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setisLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    const getQuality = (id) => {
        const found = qualities.find((q) => q._id === id);
        return found;
    };

    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
    };

    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default QualityProvider;
