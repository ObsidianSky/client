import { Action } from "../../shared/models";

import { UserModel } from "./user.models";

export function userReducer(state: UserModel = null, action: Action): UserModel {
    switch (action.type) {
        default:
            return state;
    }
}