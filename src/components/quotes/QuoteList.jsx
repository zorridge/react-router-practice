import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
    return quotes.sort((quoteA, quoteB) => {
        if (ascending) {
            return quoteA.id > quoteB.id ? 1 : -1;
        } else {
            return quoteA.id < quoteB.id ? 1 : -1;
        }
    });
};

const QuoteList = props => {
    const history = useHistory();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const isAsc = queryParams.get('sort') === 'asc';

    const changeSortHandler = () => {
        history.push({
            pathname: location.pathname,
            search: `?sort=${isAsc ? 'desc' : 'asc'}`,
        });
        // history.push(`${location.pathname}?sort=` + (isAsc ? 'desc' : 'asc'));
    };

    const sortedQuotes = sortQuotes(props.quotes, isAsc);

    return (
        <>
            <div className={classes.sorting}>
                <button onClick={changeSortHandler}>
                    Sort {isAsc ? 'Descending' : 'Ascending'}
                </button>
            </div>
            <ul className={classes.list}>
                {sortedQuotes.map(quote => (
                    <QuoteItem
                        key={quote.id}
                        id={quote.id}
                        author={quote.author}
                        text={quote.text}
                    />
                ))}
            </ul>
        </>
    );
};

export default QuoteList;
