import React, {Component} from 'react';
import {MessageModel} from "../../features/chat/chat.models";
import './Message.scss'

interface MessageProps {
    message: MessageModel;
    arrowPosition: 'left' | 'right'
}

class Message extends Component<MessageProps> {
    render() {
        const { message } = this.props;
        return (
            <div className={`message message_${this.props.arrowPosition}`}>
                <div className="name">{message.author.name}</div>
                <pre className="text">{message.content}</pre>
            </div>
        );
    }
}

export default Message;