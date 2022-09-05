import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiselectField = ({
    options,
    label,
    name,
    onChange,
    value,
    valueProperty,
    dataProperty,
    error
}) => {
    const isLoading = options.length === 0;

    const convertData = (rawData) => {
        if (rawData) {
            const convertedData = rawData.map((item) => ({
                value: item[valueProperty],
                label: item[dataProperty]
            }));
            return convertedData;
        } else {
            return '';
        }
    };

    const handleChange = (selected) => {
        const selectedData = selected.map((selectedItem) => {
            return options.find(
                (optionsItem) =>
                    optionsItem[valueProperty] === selectedItem.value
            );
        });
        onChange({ name, value: selectedData });
    };

    return (
        <div className="mb-4">
            <div>{label}</div>
            <Select
                isMulti
                options={convertData(options)}
                closeMenuOnSelect={false}
                isLoading={isLoading}
                value={convertData(value)}
                onChange={handleChange}
            />
            {error && <div className="text-danger">{error}</div>}
        </div>
    );
};

MultiselectField.propTypes = {
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array,
    valueProperty: PropTypes.string.isRequired,
    dataProperty: PropTypes.string.isRequired,
    error: PropTypes.string
};

MultiselectField.defaultProps = {
    valueProperty: '_id',
    dataProperty: 'name',
    name: 'select'
};

export default MultiselectField;
