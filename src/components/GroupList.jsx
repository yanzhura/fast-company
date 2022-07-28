import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({
    items,
    onItemSelect,
    currentItem,
    valueProperty,
    dataProperty
}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map((key) => (
                <li
                    key={items[key][valueProperty]}
                    className={
                        'list-group-item' +
                        (items[key] === currentItem ? ' active' : '')
                    }
                    onClick={() => onItemSelect(items[key])}
                    role="button"
                >
                    {items[key][dataProperty]}
                </li>
            ))}
        </ul>
    );
};

GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    currentItem: PropTypes.object,
    valueProperty: PropTypes.string.isRequired,
    dataProperty: PropTypes.string.isRequired
};

GroupList.defaultProps = {
    valueProperty: '_id',
    dataProperty: 'name'
};

export default GroupList;
