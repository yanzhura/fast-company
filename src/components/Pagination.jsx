import React from 'react';
import { range } from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ pagesCount, currentPage, onPageChange }) => {
    const pagesArray = range(1, pagesCount + 1);

    return (
        <nav>
            <ul className="pagination">
                {pagesArray.map((page) => (
                    <li
                        className={
                            page === currentPage
                                ? 'page-item active'
                                : 'page-item'
                        }
                        key={`page_${page}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    pagesCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
