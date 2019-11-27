import { call, put, take } from '@redux-saga/core/effects';
import * as api from '../../services/api/api';
import {
    GET_MESSAGES,
    getMessagesFailedAction,
    getMessagesPendingAction,
    getMessagesSuccessAction
} from './chat.actions';

export function* resolveChatMessagesSaga(chatId) {
    yield put(getMessagesPendingAction());

    try {
        const response = yield call(api.getMessages, chatId);
        yield put(getMessagesSuccessAction(response));

        return response;
    } catch (e) {
        yield put(getMessagesFailedAction(e.errorMessage));
    }
}

export function* resolveChatMessagesSagaWatcher() {
    while (true) {
        const { payload } = yield take(GET_MESSAGES);

        yield call(resolveChatMessagesSaga, payload)
    }
}