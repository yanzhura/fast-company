import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({
    items,
    onItemSelect,
    currentItem,
    valueProperty,
    dataProperty
}) => {
    // Делаем наш компонент более универсальным: он может принимать и объект с объектами и массив с объектами
    let data = [];
    if (!Array.isArray(items)) {
        data = Object.keys(items).map((key) => items[key]);
    } else {
        data = items;
    }

    return (
        <ul className="list-group">
            {data.map((item) => (
                <li
                    key={item[valueProperty]}
                    className={
                        'list-group-item' +
                        (item === currentItem ? ' active' : '')
                    }
                    onClick={() => onItemSelect(item)}
                    role="button"
                >
                    {item[dataProperty]}
                </li>
            ))}
        </ul>
    );
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired
    ]),
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
