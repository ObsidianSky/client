import {SKT_NEW_MESSAGE, SKT_USER_DISCONNECTED, SKT_ACTIVE_USERS, SKT_MESSAGE_HISTORY, SKT_USER_CONNECTED} from "./shared/socket-messages.model";
import {receiveMessage} from "./features/chat/chat.actions";
// import {userConnected, userDisconnected} from "./features/active-users/active-users.actions";
import {Action} from "./shared/models";

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
        case SKT_NEW_MESSAGE:
            return receiveMessage(message.payload);
        // case SKT_USER_CONNECTED:
        //     return userConnected(message.payload);
        // case SKT_USER_DISCONNECTED:
        //     return userDisconnected(message.payload);
        // case SKT_ACTIVE_USERS:
        //     return message.payload.map(userConnected);
        case SKT_MESSAGE_HISTORY:
            return message.payload.map(receiveMessage);
        default:
            return null;
    }
}