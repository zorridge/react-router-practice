import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Quotes from './pages/Quotes';
import QuoteDetail from './pages/QuoteDetail';
import NewQuote from './pages/NewQuote';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <Redirect to='/quotes' />
                </Route>
                <Route path='/quotes' exact>
                    <Quotes />
                </Route>
                <Route path='/quotes/new'>
                    <NewQuote />
                </Route>
                <Route path='/quotes/:quoteId'>
                    <QuoteDetail />
                </Route>
                <Route path='*'>
                    <NotFound />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
