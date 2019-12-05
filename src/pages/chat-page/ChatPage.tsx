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
import EditMessageForm from '../../components/chat/edit-message-form/EditMessageForm';

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
        this.cancelEditing = this.cancelEditing.bind(this);
        this.handleEditedMessageSubmit = this.handleEditedMessageSubmit.bind(this);
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

    cancelEditing(): void {
        this.setState({messageToEdit: null})
    }

    handleEditedMessageSubmit(messageText: string): void {
        const messageToEdit = this.state.messageToEdit;

        if (messageText !== messageToEdit.content) {
            this.props.editMessage(messageText, messageToEdit.id)
        }

        this.cancelEditing();
    }

    handleMessageSubmit(messageText: string): void {
        this.props.sendMessage(messageText);
    }

    render() {
        const messageForm = this.state.messageToEdit ?
            <EditMessageForm message={this.state.messageToEdit.content}
                             onMessageSubmit={this.handleEditedMessageSubmit}
                             onCancel={this.cancelEditing}/> :
            <NewMessageForm onMessageSubmit={this.handleMessageSubmit}/>;

        return (
            <div>
                {this.props.currentChat && this.props.userId ? (
                    <div className="chat-page">
                        <DirectChatHeader goBack={this.props.goBack}
                                          chat={this.props.currentChat}/>
                        <div className="chat-container">
                            <Chat messages={this.props.messages}
                                  userId={this.props.userId}
                                  onMessageAction={this.handleMessageAction}/>
                        </div>
                        <div className="message-form-container">
                            {messageForm}
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
        editMessage: (message, id) => dispatch(socketEditMessage({
            message,
            id
        })),
        goBack: () => dispatch(push('/chat-list'))
    }
};

export default connect(
    mapState,
    mapDispatchToProps
)(ChatPage);