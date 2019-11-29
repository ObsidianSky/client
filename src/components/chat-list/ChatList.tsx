import React from 'react';
import { List } from 'antd';
import { ChatModel } from '../../features/chat-list/chat-list.models';
import { Link } from 'react-router-dom';
import { getChatName } from '../../services/utils';
import './ChatList.scss';
import DirectChatAvatar from '../../containers/chat/OnlineBadge';

interface ChatListProps {
    chatList: ChatModel[];
    userId: string;
}



const ChatList = ({chatList, userId}: ChatListProps) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={chatList}
            renderItem={(chat: ChatModel) => (
                <Link to={`/chat/${chat.id}`}>
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <DirectChatAvatar chat={chat}/>
                            }
                            title={getChatName(chat)}
                            description="Last message will be here"
                        />
                    </List.Item>
                </Link>
            )}
        />
    )
};

export default ChatList;