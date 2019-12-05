import {SocketOutAction} from "../../shared/models";

type socketOutActionCreator<T = string> = (T) => SocketOutAction;

export const SOCKET_CONNECT = "SOCKET_CONNECT";
export const SOCKET_CONNECTING = "SOCKET_CONNECTING";
export const SOCKET_CONNECTED = "SOCKET_CONNECTED";
export const SOCKET_DISCONNECT = "SOCKET_DISCONNECT";
export const SOCKET_DISCONNECTED = "SOCKET_DISCONNECTED";
export const SOCKET_MESSAGE = "SOCKET_MESSAGE";

export const socketConnectAction = (userId) => ({ type: 'SOCKET_CONNECT', payload: userId });
export const socketConnectingAction = ()  => ({ type: 'SOCKET_CONNECTING' });
export const socketConnectedAction = () => ({ type: 'SOCKET_CONNECTED' });
export const socketDisconnectAction = () => ({ type: 'SOCKET_DISCONNECT' });
export const socketDisconnectedAction = () => ({ type: 'SOCKET_DISCONNECTED' });

export const socketSendMessage: socketOutActionCreator = (payload) => ({ type: 'SOCKET_MESSAGE', command: 'NEW_MESSAGE', payload: payload});
export const socketEditMessage: socketOutActionCreator = (payload) => ({ type: 'SOCKET_MESSAGE', command: 'EDIT_MESSAGE', payload: payload});