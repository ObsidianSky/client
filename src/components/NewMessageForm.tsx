import React, { FunctionComponent, useState } from 'react';
import './NewMessageForm.scss';
import Button from "./Button";

const NewMessageForm: FunctionComponent<{ onMessageSubmit: (string) => any }> = ({onMessageSubmit}) => {
    const [text, setText]: [string, Function] = useState('');

    const onTextChangeHandler = (event) => {
        setText(event.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        onMessageSubmit(text);
        setText('');
    };

    return (
        <div className="new-message-container-wrapper">
            <div className="new-message-container">
                <form className="new-message-form" onSubmit={formSubmitHandler}>
                    <textarea className="textarea" value={text} onChange={onTextChangeHandler}/>
                    <Button type='submit' className='button' text="Send"/>
                </form>
            </div>
        </div>
    );

};

export default NewMessageForm;