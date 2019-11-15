import React, {Component} from 'react';
import NewMessageForm from "../components/NewMessageForm";
import {connect} from "react-redux";
import ChatContainer from "../containers/ChatContainer";
import { Redirect } from 'react-router-dom';
import ActiveUsersContainer from "../containers/ActiveUsersContainer";
import {wsConnect, wsSetName} from "../features/middleware/ws.actions";


class ChatPage extends Component<{ name, dispatch: Function }> {
    componentDidMount(): void {
        this.props.dispatch(wsConnect('ws://localhost:8081'));
        if (this.props.name) {
            this.props.dispatch(wsSetName(this.props.name));
        }
    }

    render() {
        const chat = <div className="app">
            <div className="main">
                <div className="chat-section">
                    <ChatContainer/>
                </div>
                <div className="new-message-section">
                    <NewMessageForm dispatch={this.props.dispatch}/>
                </div>
            </div>
            <div className="sidebar-section">
                <ActiveUsersContainer/>
            </div>
        </div>;

        return this.props.name ? chat : <Redirect to="/login/"/>;
    }
}

const mapState = (state) => {
    return {name: state.user && state.user.name}
};

export default connect(mapState, null)(ChatPage);