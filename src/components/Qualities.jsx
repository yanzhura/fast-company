import React from 'react';
import PropTypes from 'prop-types';

const Qualities = ({ qualities }) => {
    const qualityBadges = qualities.map((quality) => {
        const badgeStyle = `badge bg-${quality.color} m-1`;

        return (
            <span key={quality._id} className={badgeStyle}>
                {quality.name}
            </span>
        );
    });

    return qualityBadges;
};

Qualities.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default Qualities;
