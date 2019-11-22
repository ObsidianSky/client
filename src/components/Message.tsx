import React, {Component} from 'react';
import {MessageModel} from "../features/chat/chat.models";
import './Message.scss'

class Message extends Component<{message: MessageModel}> {
    render() {
        const { message } = this.props;
        return (
            <div className="message">
                <div className="name">{message.author.name}</div>
                <div className="text">{message.content}</div>
            </div>
        );
    }
}

export default Message;