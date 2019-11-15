import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, List } from 'antd';
import { StoreState } from '../rootReducer';
import { ChatModel } from '../features/chat-list/chat-list.models';

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
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar>C</Avatar>}
                    title={<a href="https://ant.design">{getChatName(chat)}</a>}
                    description="Last message will be here"
                />
            </List.Item>
        )}
    />;

    return (
        <>
            {chatListLoading ? <div>'Loading...'</div> : chatListJSX}
        </>
    );

};

export default ChatListPage;