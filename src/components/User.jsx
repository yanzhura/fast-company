import React from 'react';
import Qualities from './Qualities';
import Bookmark from './Bookmark';

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onBookmark,
    onDelete,
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
                    }}>
                    <i
                        className="bi bi-trash3"
                        style={{ fontSize: '1.1rem' }}></i>
                </button>
            </td>
        </tr>
    );
};

export default User;
