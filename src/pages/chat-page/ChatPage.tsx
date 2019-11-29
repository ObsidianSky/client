import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../rootReducer';
import { getMessagesAction } from '../../features/chat/chat.actions';
import Chat from '../../components/chat/Chat';
import NewMessageForm from '../../components/chat/new-message-form/NewMessageForm';
import { socketSendMessage } from '../../features/socket/socket.actions';
import { MessageModel } from '../../features/chat/chat.models';
import './ChatPage.scss';
import { PageHeader } from 'antd';
import { ChatModel } from '../../features/chat-list/chat-list.models';
import { getChatName } from '../../services/utils';
import { push } from 'connected-react-router';
import DirectChatHeader from '../../components/chat/direct-chat-header/DirectChatHeader';

interface ChatPageProps {
    match: any,
    pending: boolean,
    messages: MessageModel[],
    getMessages: any,
    sendMessage: any,
    goBack: any,
    currentChat: ChatModel,
    userId: string
}


class ChatPage extends Component<ChatPageProps> {
    componentDidMount(): void {
        this.props.getMessages();
    }

    render() {
        return (
            <div>
                {this.props.currentChat && this.props.userId ? (
                    <div className="chat-page">
                        <DirectChatHeader goBack={this.props.goBack} chat={this.props.currentChat}/>
                        <div className="chat-container">
                            <Chat messages={this.props.messages} userId={this.props.userId}/>
                        </div>
                        <div className="message-form-container">
                            <NewMessageForm onMessageSubmit={this.props.sendMessage}/>
                        </div>
                    </div>
                ):  <div>Loading...</div> }
            </div>
        );
    }
}

const mapState = (state: StoreState, ownProps) => ({
    messages: state.chat.messages,
    pending: state.chat.pending,
    currentChat: state.chatList.data && state.chatList.data.find(chat => chat.id === ownProps.match.params.chatId),
    userId: state.user.user && state.user.user.id
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMessages: () => dispatch(getMessagesAction(ownProps.match.params.chatId)),
        sendMessage: (message) => dispatch(socketSendMessage({
            message,
            chatId: ownProps.match.params.chatId
        })),
        goBack: () => dispatch(push('/chat-list'))
    }
};

export default connect(
    mapState,
    mapDispatchToProps
)(ChatPage);