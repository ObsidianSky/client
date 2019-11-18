import { all } from 'redux-saga/effects'
import { initialDataResolve, loginFlow } from './features/authentication/authentication.saga';

export default function* rootSaga() {
    yield all([
        loginFlow(),
        initialDataResolve(),
    ])
}