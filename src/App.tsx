import React, { Component, useEffect, useState } from 'react';
import './App.scss';
import 'antd/dist/antd.css';

import { AUTH_LOCAL_STORAGE_KEY } from './features/authentication/authentication.constants';
import { userLogInSuccessAction } from './features/authentication/authentication.actions';
import localStorageService from './services/localstorage';
import { ConnectedRouter } from "connected-react-router";
import { history } from './configureStore';
import { Route, Switch } from 'react-router';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/chat-page/ChatPage';
import ChatListPage from './pages/ChatListPage';
import PageNotFound from './pages/PageNotFound';
import AuthenticatedRoute from './containers/AuthenticatedRoute';

const App = ({store}) => {
    const [tokenResolved, setTokenResolve] = useState();

    useEffect(() => {
        const item = localStorageService.get(AUTH_LOCAL_STORAGE_KEY);

        if (item) {
            store.dispatch(userLogInSuccessAction(item));
        }

        setTokenResolve(true);
    }, []);

    if (!tokenResolved) return null;

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <AuthenticatedRoute path="/" exact component={ChatListPage}/>
                <AuthenticatedRoute path="/chat/:chatId" component={ChatPage}/>
                <AuthenticatedRoute path="/chat-list" component={ChatListPage}/>
                <Route component={PageNotFound}/>
            </Switch>
        </ConnectedRouter>
    )
}

export default App;
