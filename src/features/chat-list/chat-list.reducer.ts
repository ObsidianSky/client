import { Action } from "../../shared/models";
import { ChatModel } from './chat-list.models';
import { CHAT_LIST_FAILED, CHAT_LIST_PENDING, CHAT_LIST_SUCCESS } from './chat-list.actions';

export interface ChatListState {
    pending: boolean;
    data: ChatModel[];
    errorMessage: string;
}

const initialState: ChatListState = {
    pending: false,
    data: null,
    errorMessage: null
};

export function chatListReducer(state: ChatListState = initialState, action: Action): ChatListState {
    switch (action.type) {
        case CHAT_LIST_SUCCESS:
            return {pending: false, data: action.payload, errorMessage: action.payload};
        case CHAT_LIST_FAILED:
            return {pending: false, data: null, errorMessage: action.payload};
        case CHAT_LIST_PENDING:
            return {pending: true, data: null, errorMessage: null};
        default:
            return state;
    }
}