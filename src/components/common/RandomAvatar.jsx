import React from 'react';
import PropTypes from 'prop-types';

const RandomAvatar = ({ size, uid, gender }) => {
    return (
        <img
            src={`https://avatars.dicebear.com/api/${
                gender === 'other' ? 'adventurer-neutral' : gender
            }/${uid}.svg`}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width={size}
            height={size}
        />
    );
};

RandomAvatar.propTypes = {
    size: PropTypes.number,
    uid: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(['male', 'female', 'other'])
};

RandomAvatar.defaultProps = {
    size: 65
};

export default RandomAvatar;
