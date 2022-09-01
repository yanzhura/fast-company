import React from 'react';
import PropTypes from 'prop-types';

const RadioFileld = ({ options, label, name, value, onChange }) => {
    const handleChange = ({ target }) => {
        onChange({ name, value: target.value });
    };

    return (
        <div className="mb-4">
            <div>{label}</div>
            {options.map((option) => (
                <div
                    key={option.name + '_' + option.value}
                    className="form-check form-check-inline"
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name={name}
                        value={option.value}
                        id={option.name + '_' + option.value}
                        onChange={handleChange}
                        checked={option.value === value}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={option.name + '_' + option.value}
                    >
                        {option.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

RadioFileld.propTypes = {
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default RadioFileld;
