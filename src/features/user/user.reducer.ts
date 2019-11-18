import { Action } from "../../shared/models";

import { UserModel } from "./user.models";
import { GET_USER_FAILED, GET_USER_PENDING, GET_USER_SUCCESS } from './user.actions';


export interface UserState {
    user: UserModel,
    pending: boolean,
    errorMessage: string
}

const initialState: UserState = {
    user: null,
    pending: false,
    errorMessage: null
};

export function userReducer(state: UserState = initialState, action: Action): UserState {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return { user: action.payload, pending: false, errorMessage: null };
        case GET_USER_FAILED:
            return { user: null, pending: false, errorMessage: action.payload };
        case GET_USER_PENDING:
            return { user: null, pending: true, errorMessage: null };
        default:
            return state;
    }
}