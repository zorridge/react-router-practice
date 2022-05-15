import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import LoadingSpinner from '../UI/LoadingSpinner';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';
import classes from './Comments.module.css';

import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);
    const params = useParams();
    const {
        sendRequest,
        status,
        data: commentsData,
    } = useHttp(getAllComments, true);

    useEffect(() => {
        sendRequest(params.quoteId);
    }, [sendRequest, params.quoteId]);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    // Passed on to <NewCommentForm /> on ln 63 which has the function as a dependency in an useEffect() hook (will result in infinite loop if function is not memoized)
    const addCommentHandler = useCallback(() => {
        sendRequest(params.quoteId);
    }, [sendRequest, params.quoteId]);

    let comments;
    if (status === 'pending') {
        comments = (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if (status === 'completed' && commentsData && commentsData.length > 0) {
        comments = <CommentsList comments={commentsData} />;
    }

    if (
        status === 'completed' &&
        (!commentsData || commentsData.length === 0)
    ) {
        comments = <p className='centered'>No comments added yet!</p>;
    }

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className='btn' onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && (
                <NewCommentForm
                    quoteId={params.quoteId}
                    onAddComment={addCommentHandler}
                />
            )}
            {comments}
        </section>
    );
};

export default Comments;
