import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore, { history } from "./configureStore";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from 'react-router';
import LoginPage from './pages/LoginPage';
import ChatListPage from './pages/ChatListPage';
import PageNotFound from './pages/PageNotFound';
import authenticationRequiredHOC from './containers/authRequired.hoc';
import ChatPage from './pages/ChatPage';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" exact component={LoginPage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/chat/:chatId" component={ChatPage}/>
                    <Route path="/chat-list" component={authenticationRequiredHOC(ChatListPage)}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </ConnectedRouter>
        </App>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
