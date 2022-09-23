import React from 'react';
import PropTypes from 'prop-types';
import { useQuality } from '../../hooks/useQualities';

const Qualities = ({ qualities }) => {
    const { isLoading, getQuality } = useQuality();
    const getQualityBadges = () => {
        if (!isLoading) {
            return qualities.map((id) => {
                const quality = getQuality(id);
                const badgeStyle = `badge bg-${quality.color} m-1`;
                return (
                    <span key={quality._id} className={badgeStyle}>
                        {quality.name}
                    </span>
                );
            });
        } else {
            return <>Loading...</>;
        }
    };

    return <>{getQualityBadges()}</>;
};

Qualities.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default Qualities;
