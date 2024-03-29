import React from 'react';

const Preloader = () => {
    return (
        <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default Preloader;
