import React from 'react';
import PropTypes from 'prop-types';

const PageSizeSelector = ({ pageSize, onPageSizeChange }) => {
    return (
        <div>
            <select
                className="form-select form-select-sm"
                defaultValue={pageSize}
                onChange={(event) => onPageSizeChange(event.target.value)}
                id="page-size-selector"
            >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="0">Все</option>
            </select>
            <p
                className="text-secondary"
                style={{ margin: '3px', fontSize: '0.9rem' }}
            >
                <small>Элементов на странице</small>
            </p>
        </div>
    );
};

PageSizeSelector.propTypes = {
    pageSize: PropTypes.number.isRequired,
    onPageSizeChange: PropTypes.func.isRequired
};

export default PageSizeSelector;
