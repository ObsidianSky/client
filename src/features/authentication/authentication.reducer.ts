import { Action } from "../../shared/models";
import { LOGIN_FAILED, LOGIN_PENDING, LOGIN_SUCCESS } from './authentication.actions';

export interface AuthenticationState {
    token: string,
    pending: boolean,
    errorMessage: string
}

const initialState: AuthenticationState = {
    token: null,
    pending: false,
    errorMessage: null
};

export function authenticationReducer(state: AuthenticationState = initialState, action: Action): AuthenticationState {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { token: action.payload, pending: false, errorMessage: null };
        case LOGIN_FAILED:
            return { token: null, pending: false, errorMessage: action.payload };
        case LOGIN_PENDING:
            return { token: null, pending: true, errorMessage: null };
        default:
            return state;
    }
}