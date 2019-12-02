import React, { FunctionComponent, useState } from 'react';
import './NewMessageForm.scss';
import { Input } from 'antd';
import Button from '../../Button';
 const { TextArea } = Input;

const NewMessageForm: FunctionComponent<{ onMessageSubmit: (string) => any }> = ({onMessageSubmit}) => {
    const [text, setText]: [string, Function] = useState('');

    const onTextChangeHandler = (event) => {
        setText(event.target.value);
    };

    const formSubmitHandler = (event) => {
        if (text.trim()) {
            event.preventDefault();
            onMessageSubmit(text);
            setText('');
        }
    };

    const handleEnterPress = (event) => {
      if(!event.shiftKey) {
          formSubmitHandler(event);
      }
    };

    return (
        <div className="new-message-container-wrapper">
            <form className="new-message-form" onSubmit={formSubmitHandler}>
                <TextArea className="textarea" onPressEnter={handleEnterPress} onChange={onTextChangeHandler} value={text} autoSize={{maxRows:4, minRows:2}}/>
                <Button type='submit' className='button' text="Send"/>
            </form>
        </div>
    );

};

export default NewMessageForm;