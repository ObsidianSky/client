import { Action } from "../../shared/models";
import { createAction } from '../../utils';

export const USER_ONLINE = 'USER_ONLINE';
export const USER_OFFLINE = 'USER_OFFLINE';

export function userOnlineAction(id: string): Action {
    return createAction(USER_ONLINE, id);
}

export function userOfflineAction(id: string): Action {
    return createAction(USER_OFFLINE, id);
}