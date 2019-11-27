import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, List } from 'antd';
import { StoreState } from '../rootReducer';
import { ChatModel } from '../features/chat-list/chat-list.models';
import { Link } from 'react-router-dom';
import { getChatName, getNameAbbr } from '../services/utils';

function getAvatarText(chat: ChatModel, userId: string) {
    return chat.members.length > 2 ? null : getNameAbbr(getChatName(chat, userId));
}

const ChatListPage = () => {
    const chatList = useSelector((state: StoreState) => state.chatList.data);
    const userId = useSelector((state: StoreState) => state.user.user && state.user.user.id);

    const chatListJSX = <List
        itemLayout="horizontal"
        dataSource={chatList}
        renderItem={(chat: ChatModel) => (
          <Link to={`/chat/${chat.id}`}>
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar>{getAvatarText(chat, userId)}</Avatar>}
                    title={getChatName(chat, userId)}
                    description="Last message will be here"
                />
            </List.Item>
          </Link>
        )}
    />;

    return (
        <>
            {chatList && userId ? chatListJSX : <div>'Loading...'</div>}
        </>
    );

};


export default ChatListPage;