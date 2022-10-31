import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ isBookmarked, onBookmark }) => {
    const iconStyle = !isBookmarked ? 'bi bi-bookmark' : 'bi bi-bookmark-fill';
    return (
        <button className="btn btn-light btn-sm" onClick={onBookmark}>
            <i className={iconStyle} style={{ fontSize: '1.1rem' }}></i>
        </button>
    );
};

Bookmark.propTypes = {
    isBookmarked: PropTypes.bool,
    onBookmark: PropTypes.func.isRequired
};

export default Bookmark;
