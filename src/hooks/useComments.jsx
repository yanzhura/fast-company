import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import commentService from '../services/comment.service';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/users';

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const { uid } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        getComments();
    }, [uid]);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
    };

    async function createComment(content) {
        const comment = {
            _id: nanoid(),
            content,
            pageId: uid,
            userId: currentUserId,
            createdAt: Date.now()
        };
        try {
            const { content } = await commentService.create(comment);
            setComments((prevState) => [...prevState, content]);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.get(uid);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setisLoading(false);
        }
    }

    async function removeComment(id) {
        try {
            const { content } = await commentService.remove(id);
            if (content === null) {
                setComments((prevState) =>
                    prevState.filter((c) => c._id !== id)
                );
            }
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <CommentsContext.Provider
            value={{
                comments,
                createComment,
                getComments,
                removeComment,
                isLoading
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CommentsProvider;
