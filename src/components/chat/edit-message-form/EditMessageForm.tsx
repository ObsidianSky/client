import React, { FunctionComponent } from 'react';
import NewMessageForm from '../new-message-form/NewMessageForm';
import { Button, Icon } from 'antd';
import './EditMessageForm.scss'

interface EditMessageFormProps {
    message: string;
    onMessageSubmit: any;
    onCancel?: any;
}

const EditMessageForm: FunctionComponent<EditMessageFormProps> = ({message, onMessageSubmit, onCancel}) => {
    return (
        <div>
            <div className="edit-panel">
                <Icon type="edit" theme="filled"/>
                <div className="edit-panel__text">{message}</div>
                <Button type="link" icon="close" onClick={onCancel}/>
            </div>
            <NewMessageForm initialValue={message} onMessageSubmit={onMessageSubmit}/>
        </div>
    );
};

export default EditMessageForm;