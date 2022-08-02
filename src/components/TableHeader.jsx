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
