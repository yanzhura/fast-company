import React, { useEffect } from 'react';
import UserCommentsForm from './UserCommentsForm';
import Comment from './Comment';
import Preloader from '../../common/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from '../../../store/comments';
import { useParams } from 'react-router-dom';

const CommentsList = () => {
    const dispatch = useDispatch();
    const { uid } = useParams();
    // let sortedComments = [];

    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    useEffect(() => {
        dispatch(loadCommentsList(uid));
    }, [uid]);

    const handleRemove = (id) => {
        dispatch(removeComment(id));
    };

    // if (!isLoading) {
    //     sortedComments = [...comments];
    //     sortedComments.sort((a, b) => {
    //         return parseInt(b.created_at) - parseInt(a.created_at);
    //     });
    // }

    const getCommentElements = () => {
        return comments.map((comment) => (
            <Comment
                key={comment._id}
                commentId={comment._id}
                userId={comment.userId}
                content={comment.content}
                createdAt={comment.createdAt}
                onRemove={handleRemove}
            />
        ));
    };

    return (
        <>
            <div className="card mb-2">
                {' '}
                <div className="card-body ">
                    <UserCommentsForm />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {isLoading ? (
                        <Preloader />
                    ) : comments.length > 0 ? (
                        getCommentElements()
                    ) : (
                        'This user has no comments yet'
                    )}
                </div>
            </div>
        </>
    );
};

export default CommentsList;
