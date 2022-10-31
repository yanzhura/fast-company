import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    getQualities,
    getQualitiesLoadingStatus,
    // getQuality,
    loadQualitiesList
} from '../../store/qualities';

const Qualities = ({ qualities }) => {
    const allQualities = useSelector(getQualities());
    const qualityIsLoading = useSelector(getQualitiesLoadingStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    const getQualityBadges = () => {
        return qualities.map((id) => {
            const quality = allQualities.find((q) => q._id === id);
            const badgeStyle = `badge bg-${quality.color} m-1`;
            return (
                <span key={quality._id} className={badgeStyle}>
                    {quality.name}
                </span>
            );
        });
    };

    return <>{qualityIsLoading ? 'Loading' : getQualityBadges()}</>;
};

Qualities.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default Qualities;
