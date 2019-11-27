import { ChatModel } from '../features/chat-list/chat-list.models';

export function getChatName(chat: ChatModel, currentUserId: string): string {
    const chatMembersWithoutUser = chat.members.filter(user => user.id !== currentUserId);

    return chatMembersWithoutUser.length > 1 ? chat.name : chatMembersWithoutUser[0].name;
}

export function getNameAbbr(name: string): string {
    return name.split(' ').map(nameChunk => nameChunk[0]).join('');
}