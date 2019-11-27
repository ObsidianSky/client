import { put, take, call, fork, cancel } from 'redux-saga/effects'
import { authenticate } from '../../services/api/api';
import {
    LOGIN,
    LOGIN_FAILED,
    userLogInFailedAction,
    userLogInPendingAction,
    userLogInSuccessAction
} from './authentication.actions';
import localStorageService from '../../services/localstorage';
import { AUTH_LOCAL_STORAGE_KEY } from './authentication.constants';
import { history } from '../../configureStore';
import { push } from 'connected-react-router';

function* authenticateSaga(action) {
    yield put(userLogInPendingAction());

    try {
        const response = yield call(authenticate, action.payload);
        yield put(userLogInSuccessAction(response));

        localStorageService.set(AUTH_LOCAL_STORAGE_KEY, {userId: response.userId, token: response.token});

        const from = history.location.state.from;

        yield put(push(from || '/'));

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
