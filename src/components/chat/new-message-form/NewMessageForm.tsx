import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import './NewMessageForm.scss';
import { Input } from 'antd';
import Button from '../../Button';

const {TextArea} = Input;

interface NewMessageForm {
    onMessageSubmit: (string) => any,
    initialValue?: string
}

const NewMessageForm: FunctionComponent<NewMessageForm> = ({onMessageSubmit, initialValue}) => {
    const [ text, setText ]: [ string, Function ] = useState('');
    const textAreaRef = useRef(null);

    useEffect(() => {
        textAreaRef && textAreaRef.current.focus();
    }, []);

    useEffect(() => {
        if (initialValue) {
            setText(initialValue);
        }
    }, [initialValue]);

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
        if (!event.shiftKey) {
            formSubmitHandler(event);
        }
    };

    return (
        <div className="new-message-form-wrapper">
            <form className="new-message-form" onSubmit={formSubmitHandler}>
                <TextArea className="textarea"
                          onPressEnter={handleEnterPress}
                          onChange={onTextChangeHandler}
                          value={text}
                          autoSize={{maxRows: 4, minRows: 2}}
                          ref={textAreaRef}/>
                <Button type='submit' className='button' text="Send"/>
            </form>
        </div>
    );

};

export default React.forwardRef(NewMessageForm);