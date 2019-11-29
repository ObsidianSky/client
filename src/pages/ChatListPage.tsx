import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../rootReducer';
import ChatList from '../components/chat-list/ChatList';

const ChatListPage = () => {
    const chatList = useSelector((state: StoreState) => state.chatList.data);
    const userId = useSelector((state: StoreState) => state.user.user && state.user.user.id);

    return (
        <>
            {chatList && userId ? <ChatList chatList={chatList} userId={userId}/> : <div>'Loading...'</div>}
        </>
    );

};


export default ChatListPage;