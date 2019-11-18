import { Action } from "../../shared/models";
import { LOGIN_FAILED, LOGIN_PENDING, LOGIN_SUCCESS } from './authentication.actions';

export interface AuthenticationState {
    userId: string,
    token: string,
    pending: boolean,
    errorMessage: string
}

const initialState: AuthenticationState = {
    userId: null,
    token: null,
    pending: false,
    errorMessage: null
};

export function authenticationReducer(state: AuthenticationState = initialState, action: Action): AuthenticationState {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { userId:  action.payload.userId, token: action.payload.token, pending: false, errorMessage: null };
        case LOGIN_FAILED:
            return { userId: null, token: null, pending: false, errorMessage: action.payload };
        case LOGIN_PENDING:
            return { userId: null, token: null, pending: true, errorMessage: null };
        default:
            return state;
    }
}