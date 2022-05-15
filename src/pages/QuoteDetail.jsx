import React, { useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import LoadingSpinner from '../components/UI/LoadingSpinner';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

const QuoteDetail = () => {
    const {
        sendRequest,
        status,
        data: quoteData,
        error,
    } = useHttp(getSingleQuote, true);
    const match = useRouteMatch();
    const params = useParams();

    useEffect(() => {
        sendRequest(params.quoteId);
    }, [sendRequest, params.quoteId]);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if (status === 'error') {
        return <p className='centered'>{error}</p>;
    }

    if (!quoteData.text) {
        return <p className='centered'>Quote does not exist!</p>;
    }

    return (
        <>
            <HighlightedQuote author={quoteData.author} text={quoteData.text} />
            <Route path={`${match.path}`} exact>
                <div className='centered'>
                    <Link to={`${match.url}/comments`} className='btn--flat'>
                        Load Comments
                    </Link>
                </div>
            </Route>

            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </>
    );
};

export default QuoteDetail;
