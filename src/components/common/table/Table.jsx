import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import PropTypes from 'prop-types';

const Table = ({ selectedSort, onSort, columns, data, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader {...{ selectedSort, onSort, columns }} />
                    <TableBody {...{ data, columns }} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    children: PropTypes.array
};

export default Table;
