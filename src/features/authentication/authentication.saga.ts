import { put, take, call, fork, cancel } from 'redux-saga/effects'
import { authenticate } from '../../api/api';
import {
    LOGIN,
    LOGIN_FAILED,
    userLogInFailedAction,
    userLogInPendingAction,
    userLogInSuccessAction
} from './authentication.actions';
import localStorageService from '../../localstorage';
import { AUTH_LOCAL_STORAGE_KEY } from './authentication.constants';

function* authenticateSaga(action) {
    yield put(userLogInPendingAction());

    try {
        const response = yield call(authenticate, action.payload);
        yield put(userLogInSuccessAction(response));

        localStorageService.set(AUTH_LOCAL_STORAGE_KEY, {userId: response.userId, token: response.token});

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
