import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({ label, name, value, onChange, error }) => {
    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '');
    };

    const handleChange = ({ target }) => {
        onChange({ name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group input-group-sm has-validation">
                <textarea
                    className={getInputClasses()}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    rows={3}
                />
                <div className="invalid-feedback">{error}</div>
            </div>
        </div>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default TextAreaField;
