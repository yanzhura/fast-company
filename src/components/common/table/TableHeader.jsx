import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ selectedSort, onSort, columns }) => {
    const handleSort = (sortBy) => {
        if (selectedSort.path === sortBy) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === 'asc' ? 'desc' : 'asc'
            });
        } else {
            onSort({
                ...selectedSort,
                order: 'asc',
                path: sortBy
            });
        }
    };

    const getSortSymbol = () => {
        return selectedSort.order === 'asc' ? (
            <i
                className="bi bi-caret-up-fill p-2"
                style={{ color: 'grey' }}
            ></i>
        ) : (
            <i
                className="bi bi-caret-down-fill p-2"
                style={{ color: 'grey' }}
            ></i>
        );
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((key) => {
                    return (
                        <th
                            key={key}
                            onClick={
                                columns[key].path
                                    ? () => handleSort(columns[key].path)
                                    : undefined
                            }
                            role={columns[key].path ? 'button' : ''}
                            scope="col"
                        >
                            {columns[key].name}
                            {columns[key].path === selectedSort.path
                                ? getSortSymbol()
                                : ''}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
