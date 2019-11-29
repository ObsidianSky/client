import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { authenticationReducer, AuthenticationState}  from "./features/authentication/authentication.reducer";
import { chatReducer, ChatState } from "./features/chat/chat.reducer";
import { chatListReducer, ChatListState } from './features/chat-list/chat-list.reducer';
import { userReducer, UserState } from './features/user/user.reducer';
import { usersOnlineReducer, UsersOnlineState } from './features/users-online/users-online.reducer';

export interface StoreState {
    router: any,
    authentication: AuthenticationState,
    user: UserState,
    chat: ChatState,
    chatList: ChatListState,
    usersOnline: UsersOnlineState
}

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    authentication: authenticationReducer,
    user: userReducer,
    chat: chatReducer,
    chatList: chatListReducer,
    usersOnline: usersOnlineReducer
});