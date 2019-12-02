import React from 'react';
import { List } from 'antd';
import { ChatModel } from '../../features/chat-list/chat-list.models';
import { Link } from 'react-router-dom';
import { getDirectChatName } from '../../services/utils';
import './ChatList.scss';
import DirectAvatar from '../direct-avatar/DirectAvatar';
import OnlineBadge from '../../containers/chat/OnlineBadge';

interface ChatListProps {
    chatList: ChatModel[];
    userId: string;
}

const getDirectChatMemberId = chat => chat.members[0].id;

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
                                <OnlineBadge userId={getDirectChatMemberId(chat)}>
                                    <DirectAvatar chat={chat}/>
                                </OnlineBadge>
                            }
                            title={getDirectChatName(chat)}
                            description="Last message will be here"
                        />
                    </List.Item>
                </Link>
            )}
        />
    )
};

export default ChatList;