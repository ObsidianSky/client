import { MessageModel } from "./chat.models";
import { createAction } from "../../utils";
import { Action } from "../../shared/models";

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const MESSAGE_EDITED = 'MESSAGE_EDITED';

export const GET_MESSAGES_PENDING = 'GET_MESSAGES_PENDING';
export const GET_MESSAGES_FAILED = 'GET_MESSAGES_FAILED';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';

export const GET_MESSAGES = 'GET_MESSAGES';

export function getMessagesPendingAction(): Action {
    return createAction(GET_MESSAGES_PENDING);
}

export function getMessagesFailedAction(errorMessage: string): Action<string> {
    return createAction(GET_MESSAGES_FAILED, errorMessage);
}

export function getMessagesSuccessAction(payload: MessageModel[]): Action {
    return createAction(GET_MESSAGES_SUCCESS, payload);
}

export function getMessagesAction(chatId: string): Action {
    return createAction(GET_MESSAGES, chatId);
}

export function receivedMessageAction(payload: MessageModel): Action<MessageModel> {
    return createAction(MESSAGE_RECEIVED, payload);
}

export function editedMessageAction(payload: MessageModel): Action<MessageModel> {
    return createAction(MESSAGE_EDITED, payload);
}
