import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, List } from 'antd';
import { StoreState } from '../rootReducer';
import { ChatModel } from '../features/chat-list/chat-list.models';
import { Link } from 'react-router-dom';

function getChatName(chat: ChatModel) {
    return chat.members.length > 2 ? chat.name : 'Name of your friend';
}

const ChatListPage = () => {
    const chatList = useSelector((state: StoreState) => state.chatList.data);
    const chatListLoading = useSelector((state: StoreState) => state.chatList.pending);

    const chatListJSX = <List
        itemLayout="horizontal"
        dataSource={chatList}
        renderItem={(chat: ChatModel) => (
          <Link to={`/chat/${chat.id}`}>
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar>C</Avatar>}
                    title={getChatName(chat)}
                    description="Last message will be here"
                />
            </List.Item>
          </Link>
        )}
    />;

    return (
        <>
            {chatListLoading ? <div>'Loading...'</div> : chatListJSX}
        </>
    );

};

export default ChatListPage;