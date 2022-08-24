import React from 'react';

const GroupListSelect = () => {
    return (
        <select
            className="form-select form-select-sm"
            aria-label="Default select example"
        >
            <option selected disabled>Профессия...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
    );
};

export default GroupListSelect;
