import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
    options,
    tip,
    name,
    label,
    onChange,
    onClear,
    value,
    error,
    valueProperty,
    dataProperty
}) => {
    const getInputClasses = () => {
        return 'form-select' + (error ? ' is-invalid' : '');
    };

    if (options.length === 0) {
        value = 'loading';
    }

    const handleChange = ({ target }) => {
        const selectedObject = options.find(
            (option) => option[valueProperty] === target.value
        );
        onChange({ name, value: selectedObject });
    };

    return (
        <div className="mb-4">
            {label ? <div>{label}</div> : ''}
            {value !== undefined && (
                <div className="input-group input-group-sm">
                    <select
                        className={getInputClasses()}
                        name={name}
                        onChange={handleChange}
                        value={value[valueProperty] || tip}
                    >
                        {tip ? (
                            <option value={tip} disabled>
                                {tip}
                            </option>
                        ) : (
                            ''
                        )}

                        {options.length === 0 && (
                            <option value="loading" disabled>
                                Загрузка...
                            </option>
                        )}

                        {options.map((item) => (
                            <option
                                key={item[valueProperty]}
                                value={item[valueProperty]}
                            >
                                {item[dataProperty]}
                            </option>
                        ))}
                    </select>
                    {onClear ? (
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={onClear}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    ) : (
                        ''
                    )}
                    {error ? (
                        <div className="invalid-feedback">{error}</div>
                    ) : (
                        ''
                    )}
                </div>
            )}
        </div>
    );
};

SelectField.propTypes = {
    options: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired
    ]),
    tip: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    error: PropTypes.string,
    valueProperty: PropTypes.string.isRequired,
    dataProperty: PropTypes.string.isRequired
};

SelectField.defaultProps = {
    valueProperty: '_id',
    dataProperty: 'name',
    name: 'select'
};

export default SelectField;
