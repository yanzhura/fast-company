import React from 'react';
import PropTypes from 'prop-types';

const CheckboxField = ({ name, value, onChange, error, children }) => {
    const getInputClasses = () => {
        return 'form-check-label' + (error ? ' is-invalid' : '');
    };

    const handleChange = () => {
        onChange({ name, value: !value });
    };

    return (
        <div className="mb-4">
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={value}
                    id={name}
                    onChange={handleChange}
                />
                <label className={getInputClasses()} htmlFor={name}>
                    {children}
                </label>
                <div className="invalid-feedback">{error}</div>
            </div>
        </div>
    );
};

CheckboxField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default CheckboxField;
