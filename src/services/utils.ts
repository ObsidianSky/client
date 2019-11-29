import { ChatModel } from '../features/chat-list/chat-list.models';

export function getChatName(chat: ChatModel): string {
    return chat.name;
}

export function getDirectChatName(chat: ChatModel): string {
    return chat.members[0].name;
}

export function getNameAbbr(name: string): string {
    return name.split(' ').map(nameChunk => nameChunk[0]).join('');
}