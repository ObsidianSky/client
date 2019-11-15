import {IdentifiableUser} from "../user/user.models";
import {USER_CONNECTED, USER_DISCONNECTED} from "./active-users.actions";
import {Action} from "../../shared/models";



const initialState: IdentifiableUser[] = [];

export function activeUsersReducer(state = initialState, action: Action): IdentifiableUser[] {
    switch(action.type) {
        case USER_CONNECTED:
            return [...state, action.payload];
        case USER_DISCONNECTED:
            return state.filter(user => user.id !== action.payload.id);
        default:
            return state;
    }
}