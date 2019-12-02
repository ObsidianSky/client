import React, { Component } from 'react';
import "./Chat.scss"
import { MessageModel } from "../../features/chat/chat.models";
import Message from "./message/Message";
import { Position } from '../shared/positions.enum';
import ContextMenuTrigger from '../context-menu/ContextMenuTrigger';
import { Menu } from 'antd';


interface ChatProps {
    messages: MessageModel[];
    userId: string;
}

class Chat extends Component<ChatProps> {
    chatRef;

    constructor(props) {
        super(props);
        this.chatRef = React.createRef();
    }

    goToBottom() {
        const chatDOM = this.chatRef.current;

        chatDOM.scrollTo(0, chatDOM.scrollHeight);
    }

    componentDidMount(): void {
        this.goToBottom();
    }

    componentDidUpdate(): void {
        this.goToBottom();
    }

    getMessagePosition = (authorId: string, userId: string): Position.Left | Position.Right => {
        return authorId === userId ? Position.Right : Position.Left;
    };

    contextMenu = (
        <div>
            <Menu>
                <Menu.Item>Edit</Menu.Item>
                <Menu.Item>Delete</Menu.Item>
            </Menu>
        </div>
    );

    render() {
        return (
                <div className="chat-wrapper">
                    <div className="chat" ref={this.chatRef}>
                        {this.props.messages.map(message => <div className={`chat-message chat-message_${this.getMessagePosition(message.authorId, this.props.userId)}`} key={message.id}>
                            <ContextMenuTrigger content={this.contextMenu}>
                                <Message message={message} arrowPosition={this.getMessagePosition(message.authorId, this.props.userId)}/>
                            </ContextMenuTrigger>
                        </div>)}
                    </div>
                </div>
        );
    }
}

export default Chat;