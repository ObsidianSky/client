import { Action } from '../../shared/models';
import { createAction } from '../../utils';
import { UserModel } from './user.models';

export const GET_USER_PENDING = 'GET_USER_PENDING';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const GET_USER = 'GET_USER';

export function getUserAction(userId: string): Action<string>{
    return createAction(GET_USER, userId);
}

export function getUserPendingAction(): Action {
    return createAction(GET_USER_PENDING);
}

export function getUserFailedAction(errorMessage: string): Action<string> {
    return createAction(GET_USER_FAILED, errorMessage);
}

export function getUserSuccessAction(user: UserModel): Action<UserModel> {
    return createAction(GET_USER_SUCCESS, user);
}