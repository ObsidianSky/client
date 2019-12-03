import React, { Component } from 'react';
import "./Chat.scss"
import { MessageModel } from "../../features/chat/chat.models";
import Message from "./message/Message";
import { Position } from '../shared/positions.enum';
import ContextMenuTrigger from '../context-menu/ContextMenuTrigger';
import { Button, Menu } from 'antd';


interface ChatProps {
    messages: MessageModel[];
    userId: string;
    onMessageAction: any;
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

    handleMessageAction(type: string, message: MessageModel, closeContextMenu): void {
        this.props.onMessageAction(type, message);
        closeContextMenu();
    }

    contextMenuFn = (data: MessageModel, close) => (
        <Menu>
            <Menu.Item><Button type="link" onClick={() => this.handleMessageAction('Edit', data, close)}>Edit</Button></Menu.Item>
            <Menu.Item><Button type="link" onClick={() => this.handleMessageAction('Delete', data, close)}>Delete</Button></Menu.Item>
        </Menu>
    );

    render() {
        return (
            <div className="chat-wrapper">
                <div className="chat" ref={this.chatRef}>
                    {this.props.messages.map(message => <div
                        className={`chat-message chat-message_${this.getMessagePosition(message.authorId, this.props.userId)}`}
                        key={message.id}>
                        <ContextMenuTrigger content={this.contextMenuFn} data={message}>
                            <Message message={message} arrowPosition={this.getMessagePosition(message.authorId, this.props.userId)}/>
                        </ContextMenuTrigger>
                    </div>)}
                </div>
            </div>
        );
    }
}

export default Chat;