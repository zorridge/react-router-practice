import React, { useEffect } from 'react';

import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import QuoteList from '../components/quotes/QuoteList';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

const Quotes = () => {
    const {
        sendRequest,
        status,
        data: dbQuotes,
        error,
    } = useHttp(getAllQuotes, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if (status === 'error') {
        return <p className='centered focused'>{error}</p>;
    }

    if (status === 'completed' && (!dbQuotes || dbQuotes.length === 0)) {
        return <NoQuotesFound />;
    }

    return <QuoteList quotes={dbQuotes} />;
};

export default Quotes;
