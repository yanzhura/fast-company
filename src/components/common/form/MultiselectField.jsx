import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiselectField = ({ options, label, name, onChange }) => {
    const convertedOptions = Object.keys(options).map((key) => ({
        value: options[key]._id,
        label: options[key].name
    }));

    const isLoading = !Object.keys(options).length;

    const handleChange = (selected) => {
        onChange({ target: { name, value: selected } });
    };

    return (
        <div className="mb-4">
            <div>{label}</div>
            <Select
                isMulti
                options={convertedOptions}
                closeMenuOnSelect={false}
                isLoading={isLoading}
                onChange={handleChange}
            />
        </div>
    );
};

MultiselectField.propTypes = {
    options: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MultiselectField;

// const opts = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
// ];
