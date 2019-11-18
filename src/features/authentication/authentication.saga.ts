import { put, take, call, fork, cancel } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { authenticate } from '../../api/api';
import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    userLogInFailedAction,
    userLogInPendingAction,
    userLogInSuccessAction
} from './authentication.actions';
import { chatListResolveSaga } from '../chat-list/chat-list.saga';
import { getChatListAction } from '../chat-list/chat-list.actions';

function* authenticateSaga(action) {
    yield put(userLogInPendingAction());

    try {
        const response = yield call(authenticate, action.payload);
        yield put(userLogInSuccessAction(response));
        yield push('/chat-list');
        return true;
    } catch (e) {
        yield put(userLogInFailedAction(e.errorMessage));
    }

}


export function* loginFlow() {
    while (true) {
        const loginAction = yield take(LOGIN);

        const task = yield fork(authenticateSaga, loginAction);
        const action = yield take(['LOGOUT', LOGIN_FAILED]);

        if (action.type === 'LOGOUT') {
            yield cancel(task)
        }
    }
}

// TODO move in separate file
export function* initialDataResolve() {
    const { payload } = yield take(LOGIN_SUCCESS);

    yield fork(chatListResolveSaga, getChatListAction(payload.user.id));

    yield put(push('/chat-list'));
}
