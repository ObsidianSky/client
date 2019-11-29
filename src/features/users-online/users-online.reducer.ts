import { Action } from "../../shared/models";
import { USER_OFFLINE, USER_ONLINE } from './users-online.actions';


export interface UsersOnlineState {
    [key: string]: boolean
}

const initialState: UsersOnlineState = {};

export function usersOnlineReducer(state: UsersOnlineState = initialState, action: Action): UsersOnlineState {
    switch (action.type) {
        case USER_ONLINE:
            return {...state, [action.payload]: true };
        case USER_OFFLINE:
            return {...state, [action.payload]: false };
        default:
            return state;
    }
}