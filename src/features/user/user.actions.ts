import { createAction } from "../../utils";
import { Action } from "../../shared/models";
import { UserModel } from './user.models';
import { LoginFormOutput } from '../../components/login-form/LoginForm';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGIN = 'LOGIN';

export function userLogInAction(payload: LoginFormOutput): Action {
    return createAction(LOGIN, payload);
}

export function userLogInPendingAction(): Action {
    return createAction(LOGIN_PENDING);
}

export function userLogInFailedAction(errorMessage: string): Action<string> {
    return createAction(LOGIN_FAILED, errorMessage);
}

export function userLogInSuccessAction({user, token}): Action<{user: UserModel, token: string}> {
    return createAction(LOGIN_SUCCESS, {user, token});
}