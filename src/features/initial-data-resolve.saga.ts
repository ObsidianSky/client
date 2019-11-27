import { fork, put, take } from '@redux-saga/core/effects';
import { LOGIN_SUCCESS } from './authentication/authentication.actions';
import { chatListResolveSaga } from './chat-list/chat-list.saga';
import { getChatListAction } from './chat-list/chat-list.actions';
import { resolveCurrentUserSaga } from './user/user.saga';
import { socketConnectAction } from './socket/socket.actions';

export function* initialDataResolve() {
    const { payload } = yield take(LOGIN_SUCCESS);

    yield put(socketConnectAction(payload.userId));

    yield fork(resolveCurrentUserSaga, payload.userId);
    yield fork(chatListResolveSaga, getChatListAction(payload.userId));
}
