import { Badge } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../rootReducer';
import './OnlineBadge.scss';

const OnlineBadge = ({children, userId}) => {
    const isChatMemberOnline = useSelector((state: StoreState) => state.usersOnline[userId]);

    return (
        <Badge className="online-badge" dot={isChatMemberOnline}>
            {children}
        </Badge>
    )
};

export default OnlineBadge;