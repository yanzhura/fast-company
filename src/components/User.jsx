import React from 'react';
import Qualities from './Qualities';
import Bookmark from './Bookmark';

const User = props => {
    return (
        <tr key={props._id}>
            <td>{props.name}</td>
            <td>
                <Qualities qualities={props.qualities} />
            </td>
            <td>{props.profession.name}</td>
            <td>{props.completedMeetings}</td>
            <td>{props.rate}</td>
            <td>
                <Bookmark
                    isBookmarked={props.bookmark}
                    onBookmark={() => props.onBookmark(props._id)}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                        props.onDelete(props._id);
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
