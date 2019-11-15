import {IdentifiableUser} from "../user/user.models";
import {createAction} from "../../utils";
import {Action} from "../../shared/models";

export const USER_CONNECTED = "USER_CONNECTED";
export const USER_DISCONNECTED = "USER_DISCONNECTED";

export function userConnected(user: IdentifiableUser): Action<IdentifiableUser> {
    return createAction(USER_CONNECTED, user);
}

export function userDisconnected(id: number): Action<number> {
    return createAction(USER_DISCONNECTED, id);
}