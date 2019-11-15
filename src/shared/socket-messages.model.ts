import {MessageModel} from "../features/chat/chat.models";

export const SKT_USER_CONNECTED = 'SKT_USER_CONNECTED';
export const SKT_USER_DISCONNECTED = 'SKT_USER_DISCONNECTED';
export const SKT_NEW_MESSAGE = 'SKT_NEW_MESSAGE';
export const SKT_ACTIVE_USERS = 'SKT_ACTIVE_USERS';
export const SKT_MESSAGE_HISTORY = 'SKT_MESSAGE_HISTORY';

interface ConnectedUser {
    id: number;
    name: string;
}

interface UserConnected {
    type: typeof SKT_USER_CONNECTED
    payload: ConnectedUser
}

interface NewMessage {
    type: typeof SKT_NEW_MESSAGE
    payload: MessageModel
}

export type SocketMessage = NewMessage | UserConnected;