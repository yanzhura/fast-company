import React from 'react';
import PropTypes from 'prop-types';
import { useProfession } from '../../hooks/useProfessions';

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfession();
    if (!isLoading) {
        const prof = getProfession(id);
        return <>{prof.name}</>;
    } else {
        return <>Loading...</>;
    }
};

Profession.propTypes = {
    id: PropTypes.string.isRequired
};

export default Profession;
