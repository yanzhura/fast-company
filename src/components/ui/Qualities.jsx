import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    getQualitiesLoadingStatus,
    getQuality,
    loadQualitiesList
} from '../../store/qualities';

const Qualities = ({ qualities }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    const qualityIsLoading = useSelector(getQualitiesLoadingStatus());

    const getQualityBadges = () => {
        if (!qualityIsLoading) {
            return qualities.map((id) => {
                const quality = useSelector(getQuality(id));
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
