import React from 'react';

const Bookmark = ({ isBookmarked, onBookmark, userId }) => {
    const iconStyle = !isBookmarked ? 'bi bi-bookmark' : 'bi bi-bookmark-fill';
    return (
        <button className="btn btn-light btn-sm" onClick={onBookmark}>
            <i className={iconStyle} style={{ fontSize: '1.1rem' }}></i>
        </button>
    );
};

export default Bookmark;
