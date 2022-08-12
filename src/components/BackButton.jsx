import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const BackButton = ({ path, title }) => {
    const history = useHistory();

    const handleBack = () => {
        history.replace(path);
    };

    return (
        <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={handleBack}
        >
            {title}
        </button>
    );
};

BackButton.propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default BackButton;
