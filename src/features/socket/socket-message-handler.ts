import { editedMessageAction, receivedMessageAction } from "../chat/chat.actions";
import { Action } from "../../shared/models";
import {
    SOCKET_IN_EDIT_MESSAGE,
    SOCKET_IN_NEW_MESSAGE,
    SOCKET_IN_USER_OFFLINE,
    SOCKET_IN_USER_ONLINE
} from './socket-in-messages.model';
import { userOfflineAction, userOnlineAction } from '../users-online/users-online.actions';

export function handleSocketMessage(message: Action, dispatch) {
    const action = mapAction(message);

    if (action) {
        Array.isArray(action) ? action.map(dispatch) : dispatch(action);
    } else {
        console.error('No action for socket message type ', message.type);
    }
}

function mapAction(message: Action): Action | null {
    switch(message.type) {
        case SOCKET_IN_NEW_MESSAGE:
            return receivedMessageAction(message.payload);
        case SOCKET_IN_USER_ONLINE:
            return userOnlineAction(message.payload);
        case SOCKET_IN_USER_OFFLINE:
            return userOfflineAction(message.payload);
        case SOCKET_IN_EDIT_MESSAGE:
            return editedMessageAction(message.payload);
        // case SKT_USER_DISCONNECTED:
        //     return userDisconnected(message.payload);
        // case SKT_ACTIVE_USERS:
        //     return message.payload.map(userConnected);
        // case SKT_MESSAGE_HISTORY:
        //     return message.payload.map(receiveMessage);
        default:
            return null;
    }
}