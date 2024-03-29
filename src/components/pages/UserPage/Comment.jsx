import React from 'react';
import PropTypes from 'prop-types';
import RandomAvatar from '../../common/RandomAvatar';
import { getDateFromNow } from '../../../utils/utils';
import { getCurrentUserId, getUserById } from '../../../store/users';
import { useSelector } from 'react-redux';

const Comment = ({ commentId, userId, content, createdAt, onRemove }) => {
    const user = useSelector(getUserById(userId));
    const currentUserId = useSelector(getCurrentUserId());
    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        {user ? (
                            <RandomAvatar uid={userId} gender={user.gender} />
                        ) : (
                            ''
                        )}
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user ? user.name : ''}
                                        <span className="small">
                                            {` - ${getDateFromNow(createdAt)}`}{' '}
                                        </span>
                                    </p>
                                    {currentUserId === userId && (
                                        <button
                                            onClick={() => onRemove(commentId)}
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    commentId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    onRemove: PropTypes.func.isRequired
};

export default Comment;
