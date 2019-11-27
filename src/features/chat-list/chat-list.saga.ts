import { put, takeEvery, call } from 'redux-saga/effects'
import { getChatList } from '../../services/api/api';
import { CHAT_LIST_SAGA, chatListFailedAction, chatListPendingAction, chatListSuccessAction } from './chat-list.actions';

export function* chatListResolveSaga(action) {
    yield put(chatListPendingAction());

    try {
        const response = yield call(getChatList, action.payload);
        yield put(chatListSuccessAction(response));
    } catch (e) {
        yield put(chatListFailedAction(e.errorMessage));
    }
}

export function* watchChatListResolveSaga() {
    yield takeEvery(CHAT_LIST_SAGA, chatListResolveSaga)
}