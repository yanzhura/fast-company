import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({
    filterUsername,
    handleFilterUsername,
    clearFilterUsername
}) => {
    return (
        <div className="input-group input-group-sm">
            <input
                type="text"
                className="form-control"
                placeholder="Поиск по имени пользователя"
                value={filterUsername}
                onChange={handleFilterUsername}
            />
            <button
                className="btn btn-secondary"
                type="button"
                id="button-addon1"
                onClick={clearFilterUsername}
            >
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
    );
};

SearchBar.propTypes = {
    filterUsername: PropTypes.string,
    handleFilterUsername: PropTypes.func.isRequired,
    clearFilterUsername: PropTypes.func.isRequired
};

export default SearchBar;
