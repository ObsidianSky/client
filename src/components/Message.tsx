import React, {Component} from 'react';
import {MessageModel} from "../features/chat/chat.models";
import './Message.scss'

class Message extends Component<{message: MessageModel}> {
    render() {
        const { message } = this.props;
        return (
            <div className="message">
                <div className="name">{message.userName}</div>
                <div className="text">{message.message}</div>
            </div>
        );
    }
}

export default Message;