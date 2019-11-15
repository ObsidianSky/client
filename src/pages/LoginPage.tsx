import React, {Component} from 'react';
import LoginFormContainer from "../containers/LoginFormContainer";

class LoginPage extends Component  {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoginFormContainer/>
        );
    }
}

export default LoginPage;