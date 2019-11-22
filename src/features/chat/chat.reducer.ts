import { MessageModel } from "./chat.models";
import { GET_MESSAGES_FAILED, GET_MESSAGES_PENDING, GET_MESSAGES_SUCCESS, MESSAGE_RECEIVED } from "./chat.actions";
import {Action} from "../../shared/models";

export interface ChatState {
    messages: MessageModel[]
    pending: boolean,
    errorMessage: string;
}

const initialState: ChatState = {
    messages: [],
    pending: false,
    errorMessage: null
};

export function chatReducer(state: ChatState = initialState, action: Action): ChatState {
    switch(action.type) {
        case MESSAGE_RECEIVED:
            return {...state, messages: [...state.messages, action.payload]};
        case GET_MESSAGES_PENDING:
            return {messages: [], pending: true, errorMessage: null};
        case GET_MESSAGES_FAILED:
            return {messages: [], pending: false, errorMessage: action.payload};
        case GET_MESSAGES_SUCCESS:
            return {messages: action.payload, pending: false, errorMessage: null};
        default:
            return state;
    }
}