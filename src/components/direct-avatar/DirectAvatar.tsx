import React, { FunctionComponent } from 'react';
import { Avatar } from 'antd';
import { ChatModel } from '../../features/chat-list/chat-list.models';
import { getDirectChatName, getNameAbbr } from '../../services/utils';

function getAvatarText(chat: ChatModel) {
    return getNameAbbr(getDirectChatName(chat));
}

interface DirectAvatarProps {
    chat: ChatModel
}

const DirectAvatar: FunctionComponent<DirectAvatarProps> = ({chat}) => {
    return (
        <Avatar>{getAvatarText(chat)}</Avatar>
    );
};

export default DirectAvatar;