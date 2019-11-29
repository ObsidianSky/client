import { PageHeader } from 'antd';
import { getDirectChatName } from '../../../services/utils';
import React, { FunctionComponent } from 'react';
import { ChatModel } from '../../../features/chat-list/chat-list.models';
import './DirectChatHeader.scss';

interface DirectChatHeaderProps {
    goBack: any,
    chat: ChatModel
}

const DirectChatHeader: FunctionComponent<DirectChatHeaderProps> = ({goBack, chat}) => {
    return (
        <PageHeader
            className="direct-chat-header"
            onBack={goBack}
            title={getDirectChatName(chat)}/>
    )
};

export default DirectChatHeader;