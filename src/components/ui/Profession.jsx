import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
    getProfessions,
    getProfessionsLoadingStatus
} from '../../store/professions';

const Profession = ({ id }) => {
    const profIsLoading = useSelector(getProfessionsLoadingStatus());
    const professions = useSelector(getProfessions());

    if (!profIsLoading) {
        const prof = professions.find((p) => p._id === id);
        return <>{prof.name}</>;
    } else {
        return <>Loading...</>;
    }
};

Profession.propTypes = {
    id: PropTypes.string.isRequired
};

export default Profession;
