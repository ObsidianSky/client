import { Action } from '../../shared/models';
import { createAction } from '../../utils';
import { ChatModel } from './chat-list.models';

export const CHAT_LIST_PENDING = 'CHAT_LIST_PENDING';
export const CHAT_LIST_FAILED = 'CHAT_LIST_FAILED';
export const CHAT_LIST_SUCCESS = 'CHAT_LIST_SUCCESS';

export const CHAT_LIST_SAGA = 'CHAT_LIST_SAGA';

export function getChatListAction(memberId: string): Action<string> {
    return createAction(CHAT_LIST_SAGA, memberId);
}

export function chatListPendingAction(): Action {
    return createAction(CHAT_LIST_PENDING);
}

export function chatListFailedAction(errorMessage: string): Action<string> {
    return createAction(CHAT_LIST_FAILED, errorMessage);
}

export function chatListSuccessAction(chatList: ChatModel[]): Action<ChatModel[]> {
    return createAction(CHAT_LIST_SUCCESS, chatList);
}