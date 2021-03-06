import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import App from './containers/app';
import Header from './components/header.component';
import Banner from './components/banner.component';
import Footer from './components/footer.component';
import * as serviceWorker from './serviceWorker';

import './index.css';

const target = document.querySelector('#root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Header />
                <Banner />
                <App />
                <Footer />
            </div>
        </ConnectedRouter>
    </Provider>,
    target
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
