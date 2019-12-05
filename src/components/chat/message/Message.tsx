import React, { FunctionComponent } from 'react';
import { MessageModel } from "../../../features/chat/chat.models";
import './Message.scss'
import { Position } from '../../shared/positions.enum';


interface MessageProps {
    message: MessageModel;
    arrowPosition: Position.Left | Position.Right
}

const Message: FunctionComponent<MessageProps> = ({message, arrowPosition}) => {
    return (
        <div className={`message message_${arrowPosition}`}>
            <div className="name">{message.author.name}</div>
            <pre className="text">{message.content}</pre>
            <div className="meta">{message.edited && 'edited'}</div>
        </div>
    );
};

export default React.memo(Message);