import React, { useEffect, useState } from 'react';
import UserCommentsForm from './UserCommentsForm';
import Comment from './Comment';
import Preloader from '../../common/Preloader';
import api from '../../../api';
import { useParams } from 'react-router-dom';

const CommentsList = () => {
    const [comments, setComments] = useState(undefined);
    const [rerender, setRerender] = useState('');
    const { uid } = useParams();

    useEffect(() => {
        api.comments.fetchCommentsForUser(uid).then((data) => {
            setComments(data);
        });
    }, [rerender]);

    const handleRemove = (id) => {
        api.comments.remove(id).then((data) => {
            setRerender(data);
        });
    };

    const sortCommentByDate = () => {
        const sortedComments = [...comments];
        sortedComments.sort((a, b) => {
            return parseInt(b.created_at) - parseInt(a.created_at);
        });
        return sortedComments;
    };

    const sortedComments = comments && sortCommentByDate();

    const getComments = () => {
        return sortedComments.map((comment) => (
            <Comment
                key={comment._id}
                commentId={comment._id}
                userId={comment.userId}
                content={comment.content}
                createdAt={comment.created_at}
                onRemove={handleRemove}
            />
        ));
    };

    return (
        <>
            <div className="card mb-2">
                {' '}
                <div className="card-body ">
                    <UserCommentsForm onNewComment={setRerender} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {!comments ? (
                        <Preloader />
                    ) : comments.length > 0 ? (
                        getComments()
                    ) : (
                        'This user has no comments yet'
                    )}
                </div>
            </div>
        </>
    );
};

export default CommentsList;
