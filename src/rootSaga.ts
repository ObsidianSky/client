import { all } from 'redux-saga/effects'
import { initialDataResolve, loginFlow } from './features/user/user.saga';

export default function* rootSaga() {
    yield all([
        loginFlow(),
        initialDataResolve(),
    ])
}