import { call, put } from '@redux-saga/core/effects';
import { getUserFailedAction, getUserPendingAction, getUserSuccessAction } from './user.actions';
import * as api from '../../services/api/api';

export function* resolveCurrentUserSaga(userId) {
    yield put(getUserPendingAction());

    try {
        const response = yield call(api.getUser, userId);
        yield put(getUserSuccessAction(response));

        return response;
    } catch (e) {
        yield put(getUserFailedAction(e.errorMessage));
    }
}