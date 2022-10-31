import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
    getProfesionById,
    getProfessionsLoadingStatus
} from '../../store/professions';

const Profession = ({ id }) => {
    const profIsLoading = useSelector(getProfessionsLoadingStatus());
    if (!profIsLoading) {
        const prof = useSelector(getProfesionById(id));
        return <>{prof.name}</>;
    } else {
        return <>Loading...</>;
    }
};

Profession.propTypes = {
    id: PropTypes.string.isRequired
};

export default Profession;
