import React, {Component} from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import { ConnectedRouter } from 'connected-react-router'
import {Route, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import PageNotFound from "./pages/PageNotFound";
import { history } from './configureStore'
import ChatListPage from './pages/ChatListPage';

class App extends Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" exact component={LoginPage}/>
                    <Route path="/login" component={LoginPage}/>
                    {/*<Route path="/chat" component={ChatPage}/>*/}
                    <Route path="/chat-list" component={ChatListPage}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </ConnectedRouter>
        )
    }
}

export default App;
