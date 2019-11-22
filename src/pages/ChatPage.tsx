import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../rootReducer';
import { getMessagesAction } from '../features/chat/chat.actions';
import Chat from '../components/chat/Chat';
import NewMessageForm from '../components/NewMessageForm';
import { socketSendMessage } from '../features/socket/socket.actions';
import { MessageModel } from '../features/chat/chat.models';

class ChatPage extends Component<{match: any, pending: boolean, messages: MessageModel[], getMessages: any, sendMessage: any}> {
    componentDidMount(): void {
        this.props.getMessages();
    }

    render() {
        const chatBlock = <>
            <Chat messages={this.props.messages}/>
            <NewMessageForm onMessageSubmit={this.props.sendMessage} />
        </>;
        return (
            <div>
                { this.props.pending ? <div>Loading...</div> : chatBlock}
            </div>
        );
    }
}

const mapState = (state: StoreState) => ({
   messages: state.chat.messages,
   pending: state.chat.pending
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMessages: () => dispatch(getMessagesAction(ownProps.match.params.chatId)),
        sendMessage: (message) => dispatch(socketSendMessage({
            message,
            chatId: ownProps.match.params.chatId
        })),
    }
};

export default connect(
    mapState,
    mapDispatchToProps
)(ChatPage);