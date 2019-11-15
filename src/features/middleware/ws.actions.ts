import {WsOutAction} from "../../shared/models";

type wsOutActionCreator<T = string> = (T) => WsOutAction;

export const wsConnect = host => ({ type: 'WS_CONNECT', host });
export const wsConnecting = host => ({ type: 'WS_CONNECTING', host });
export const wsConnected = host => ({ type: 'WS_CONNECTED', host });
export const wsDisconnect = host => ({ type: 'WS_DISCONNECT', host });
export const wsDisconnected = () => ({ type: 'WS_DISCONNECTED' });

export const wsSendMessage: wsOutActionCreator = (message) => ({ type: 'WS_MESSAGE', command: 'MESSAGE', payload: message});
export const wsSetName: wsOutActionCreator = (name) => ({ type: 'WS_MESSAGE', command: 'SET_NAME', payload: name});