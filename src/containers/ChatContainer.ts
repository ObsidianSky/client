import { connect } from 'react-redux'
import Chat from "../components/chat/Chat";


const mapState = (state) => {
    return {
        messages: state.chat.messages
    }
};


const ChatContainer = connect(
    mapState,
    null
)(Chat);

export default ChatContainer