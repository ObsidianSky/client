import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import {authenticationReducer, AuthenticationState, UserState} from "./features/authentication/authentication.reducer";
import { chatReducer, ChatState } from "./features/chat/chat.reducer";
import { chatListReducer, ChatListState } from './features/chat-list/chat-list.reducer';

export interface StoreState {
    router: any,
    authentication: AuthenticationState,
    user: UserState,
    chat: ChatState,
    chatList: ChatListState,
}

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    authentication: authenticationReducer,
    user: userReducer,
    chat: chatReducer,
    chatList: chatListReducer,
});