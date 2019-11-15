import {Action} from "./shared/models";

export function createAction(type, payload?): Action {
    return { type, payload };
}