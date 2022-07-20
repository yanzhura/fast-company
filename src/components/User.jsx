import React from 'react';
import Qualities from './Qualities';
import Bookmark from './Bookmark';
import PropTypes from 'prop-types';

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onBookmark,
    onDelete
}) => {
    return (
        <tr key={_id}>
            <td>{name}</td>
            <td>
                <Qualities qualities={qualities} />
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
                <Bookmark
                    isBookmarked={bookmark}
                    onBookmark={() => onBookmark(_id)}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                        onDelete(_id);
                    }}
                >
                    <i
                        className="bi bi-trash3"
                        style={{ fontSize: '1.1rem' }}
                    ></i>
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default User;
