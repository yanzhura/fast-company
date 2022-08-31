import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({
    options,
    tip,
    name,
    label,
    onItemSelect,
    onClear,
    currentItem,
    error,
    valueProperty,
    dataProperty
}) => {
    let data = [];
    if (!Array.isArray(options)) {
        data = Object.keys(options).map((key) => options[key]);
    } else {
        data = options;
    }

    const getInputClasses = () => {
        return 'form-select' + (error ? ' is-invalid' : '');
    };

    return (
        <div className="mb-4">
            {label ? <div>{label}</div> : ''}
            <div className="input-group">
                <select
                    className={getInputClasses()}
                    name={name}
                    onChange={onItemSelect}
                    value={currentItem}
                    defaultValue={'DEFAULT'}
                >
                    <option value="DEFAULT" disabled>
                        {tip}
                    </option>

                    {data.map((item) => (
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
                {error ? <div className="invalid-feedback">{error}</div> : ''}
            </div>
        </div>
    );
};

SelectInput.propTypes = {
    options: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired
    ]),
    tip: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,
    onItemSelect: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    currentItem: PropTypes.string,
    error: PropTypes.string,
    valueProperty: PropTypes.string.isRequired,
    dataProperty: PropTypes.string.isRequired
};

SelectInput.defaultProps = {
    valueProperty: '_id',
    dataProperty: 'name',
    name: 'select'
};

export default SelectInput;
