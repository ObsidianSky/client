import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../rootReducer';
import { getMessagesAction } from '../../features/chat/chat.actions';
import Chat from '../../components/chat/Chat';
import NewMessageForm from '../../components/chat/new-message-form/NewMessageForm';
import { socketEditMessage, socketSendMessage } from '../../features/socket/socket.actions';
import { MessageModel } from '../../features/chat/chat.models';
import './ChatPage.scss';
import { ChatModel } from '../../features/chat-list/chat-list.models';
import { push } from 'connected-react-router';
import DirectChatHeader from '../../components/chat/direct-chat-header/DirectChatHeader';

interface ChatPageProps {
    match: any,
    pending: boolean,
    messages: MessageModel[],
    getMessages: any,
    sendMessage: any,
    editMessage: any,
    goBack: any,
    currentChat: ChatModel,
    userId: string
}


class ChatPage extends Component<ChatPageProps, { messageToEdit: MessageModel}> {
    constructor(props) {
        super(props);

        this.state = {
            messageToEdit: null
        };

        this.handleMessageAction = this.handleMessageAction.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    }


    componentDidMount(): void {
        this.props.getMessages();
    }

    handleMessageAction(type: string, message: MessageModel): void {
        if (type === 'Edit') {
            this.setState({
                messageToEdit: message
            })
        }
    }

    handleMessageSubmit(messageText: string): void {
        const messageToEdit = this.state.messageToEdit;

        if (!messageToEdit) {
            this.props.sendMessage(messageText);
        } else {
            if (messageText !== messageToEdit.content) {
                this.props.editMessage(messageText, messageToEdit.id)
            }

            this.setState({messageToEdit: null})
        }
    }

    render() {
        return (
            <div>
                {this.props.currentChat && this.props.userId ? (
                    <div className="chat-page">
                        <DirectChatHeader goBack={this.props.goBack} chat={this.props.currentChat}/>
                        <div className="chat-container">
                            <Chat messages={this.props.messages} userId={this.props.userId}
                                  onMessageAction={this.handleMessageAction}/>
                        </div>
                        <div className="message-form-container">
                            <NewMessageForm initialValue={this.state.messageToEdit && this.state.messageToEdit.content} onMessageSubmit={this.handleMessageSubmit}/>
                        </div>
                    </div>
                ) : <div>Loading...</div>}
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
        editMessage: (newMessage, id) => dispatch(socketEditMessage({
            newMessage,
            id,
            chatId: ownProps.match.params.chatId
        })),
        goBack: () => dispatch(push('/chat-list'))
    }
};

export default connect(
    mapState,
    mapDispatchToProps
)(ChatPage);