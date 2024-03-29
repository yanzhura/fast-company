import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

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
                <input
                    className={getInputClasses()}
                    type={showPassword ? '' : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                'bi bi-eye' + (showPassword ? '-slash' : '')
                            }
                        ></i>
                    </button>
                )}
                <div className="invalid-feedback">{error}</div>
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: 'text'
};

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default TextField;
