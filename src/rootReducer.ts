import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import { userReducer, UserState } from "./features/user/user.reducer";
import { chatReducer, ChatState } from "./features/chat/chat.reducer";
import {activeUsersReducer} from "./features/active-users/active-users.reducer";
import { IdentifiableUser } from './features/user/user.models';
import { chatListReducer, ChatListState } from './features/chat-list/chat-list.reducer';

export interface StoreState {
    router: any,
    user: UserState,
    chat: ChatState,
    chatList: ChatListState,
    activeUsers: IdentifiableUser[]
}

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    user: userReducer,
    chat: chatReducer,
    chatList: chatListReducer,
    activeUsers: activeUsersReducer,
});