import { Badge } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../rootReducer';

const OnlineBadge = ({userId}) => {
    const isChatMemberOnline = useSelector((state: StoreState) => state.usersOnline[userId]);

    return (
        <Badge className="online-badge" dot={isChatMemberOnline}>

        </Badge>
    )
};

export default OnlineBadge;