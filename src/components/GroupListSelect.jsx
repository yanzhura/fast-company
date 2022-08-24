import React from 'react';
import PropTypes from 'prop-types';

const GroupListSelect = ({
    items,
    onItemSelect,
    clearItem,
    currentItem,
    valueProperty,
    dataProperty
}) => {
    let data = [];
    if (!Array.isArray(items)) {
        data = Object.keys(items).map((key) => items[key]);
    } else {
        data = items;
    }

    return (
        <div className="input-group input-group-sm">
            <select
                onChange={(e) => onItemSelect(e.target.value)}
                value={currentItem}
                defaultValue={'DEFAULT'}
                className="form-select"
            >
                <option value="DEFAULT" disabled>
                    Профессия...
                </option>

                {data.map((item) => (
                    <option
                        key={item[valueProperty]}
                        value={item[dataProperty]}
                    >
                        {item[dataProperty]}
                    </option>
                ))}
            </select>
            <button
                className="btn btn-secondary"
                type="button"
                onClick={clearItem}
            >
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
    );
};

GroupListSelect.propTypes = {
    items: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired
    ]),
    onItemSelect: PropTypes.func.isRequired,
    clearItem: PropTypes.func.isRequired,
    currentItem: PropTypes.string,
    valueProperty: PropTypes.string.isRequired,
    dataProperty: PropTypes.string.isRequired
};

GroupListSelect.defaultProps = {
    valueProperty: '_id',
    dataProperty: 'name'
};

export default GroupListSelect;
