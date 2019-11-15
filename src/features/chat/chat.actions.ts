import {MessageModel} from "./chat.models";
import {createAction} from "../../utils";
import {Action} from "../../shared/models";

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';

export function receiveMessage(payload: MessageModel): Action<MessageModel> {
    return createAction(MESSAGE_RECEIVED, payload);
}