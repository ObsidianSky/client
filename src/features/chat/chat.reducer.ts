import { MessageModel } from "./chat.models";
import {MESSAGE_RECEIVED} from "./chat.actions";
import {Action} from "../../shared/models";

export interface ChatState {
    messages: MessageModel[]
}

const initialState: ChatState = {
    messages: []
};

export function chatReducer(state: ChatState = initialState, action: Action): ChatState {
    switch(action.type) {
        case MESSAGE_RECEIVED:
            return { messages: [...state.messages, action.payload]};
        default:
            return state;
    }
}