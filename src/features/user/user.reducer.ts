import { IdentifiableUser } from "./user.models";
import { Action } from "../../shared/models";
import { LOGIN_FAILED, LOGIN_PENDING, LOGIN_SUCCESS } from './user.actions';

export interface UserState {
    user: IdentifiableUser,
    token: string,
    pending: boolean,
    errorMessage: string
}

const initialState: UserState = {
    user: null,
    token: null,
    pending: false,
    errorMessage: null
};

export function userReducer(state: UserState = initialState, action: Action): UserState {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { user: action.payload.user, token: action.payload.token, pending: false, errorMessage: null };
        case LOGIN_FAILED:
            return { user: null, token: null, pending: false, errorMessage: action.payload };
        case LOGIN_PENDING:
            return { user: null, token: null, pending: true, errorMessage: null };
        default:
            return state;
    }
}