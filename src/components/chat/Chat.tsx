import React, {Component} from 'react';
import "./Chat.scss"
import {MessageModel} from "../../features/chat/chat.models";
import Message from "../message/Message";

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

    componentDidMount(): void {
        this.chatRef.current.scrollTop = 80000;
    }

    getMessagePosition = (authorId: string, userId: string): 'left' | 'right' => {
        return authorId === userId ? 'right' : 'left';
    };

    render() {
        return (
                <div className="chat-wrapper">
                    <div className="chat" ref={this.chatRef}>
                        {this.props.messages.map(message => <div className={`chat-message chat-message_${this.getMessagePosition(message.authorId, this.props.userId)}`} key={message.id}>
                            <Message message={message} arrowPosition={this.getMessagePosition(message.authorId, this.props.userId)}/>
                        </div>)}
                    </div>
                </div>
        );
    }
}

export default Chat;