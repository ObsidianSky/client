import { fork, put, take } from '@redux-saga/core/effects';
import { LOGIN_SUCCESS } from './authentication/authentication.actions';
import { chatListResolveSaga } from './chat-list/chat-list.saga';
import { getChatListAction } from './chat-list/chat-list.actions';
import { push } from "connected-react-router";
import { resolveCurrentUserSaga } from './user/user.saga';

export function* initialDataResolve() {
    const { payload } = yield take(LOGIN_SUCCESS);

    yield fork(resolveCurrentUserSaga, payload.userId);
    yield fork(chatListResolveSaga, getChatListAction(payload.userID));


    yield put(push('/chat-list'));
}
