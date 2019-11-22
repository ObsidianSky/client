import React, { Component } from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import { Store } from 'redux';

import { AUTH_LOCAL_STORAGE_KEY } from './features/authentication/authentication.constants';
import { userLogInSuccessAction } from './features/authentication/authentication.actions';
import localStorageService from './localstorage';


class App extends Component<{ store: Store }> {

    componentDidMount(): void {
        const item = localStorageService.get(AUTH_LOCAL_STORAGE_KEY);

        if (item) {
            this.props.store.dispatch(userLogInSuccessAction(item));
        }
    }

    render() {
        return (
            this.props.children
        )
    }
}

export default App;
