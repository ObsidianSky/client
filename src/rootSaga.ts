import { all } from 'redux-saga/effects'
import { loginFlow } from './features/authentication/authentication.saga';
import { initialDataResolve } from './features/initial-data-resolve.saga';

export default function* rootSaga() {
    yield all([
        loginFlow(),
        initialDataResolve(),
    ])
}