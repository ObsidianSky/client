import React, {Component} from 'react';
import "./Chat.scss"
import {MessageModel} from "../../features/chat/chat.models";
import Message from "../Message";

class Chat extends Component<{ messages: MessageModel[] }> {
    chatRef;

    constructor(props) {
        super(props);
        this.chatRef = React.createRef();
    }

    componentDidMount(): void {
        this.chatRef.current.scrollTop = 80000;
    }

    render() {
        return (
            <>
                <div className="chat-wrapper">
                    <div className="chat" ref={this.chatRef}>
                        {this.props.messages.map(message => <div className="chat-message" key={message.id}><Message
                            message={message}/></div>)}
                    </div>
                </div>
            </>
        );
    }
}

export default Chat;