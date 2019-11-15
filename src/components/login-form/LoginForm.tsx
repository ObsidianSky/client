import React, { Component } from 'react';

import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import './LoginForm.scss';

export interface LoginFormOutput {
    email: string;
    password: string;
    remember: boolean;
}

export interface LoginFormProps {
    form: WrappedFormUtils,
    onLoginSubmit: (output: LoginFormOutput) => any,
    loading: boolean,
    errorMessage: string
}

class NormalLoginForm extends Component<LoginFormProps, any> {
    private handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onLoginSubmit(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-form">
                {this.props.errorMessage && <Alert message={this.props.errorMessage} type="error" showIcon />}

                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [ {required: true, message: 'Please input your email!'} ],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Email"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [ {required: true, message: 'Please input your Password!'} ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="Password"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                        <Button type="primary" loading={this.props.loading} htmlType="submit"
                                className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const LoginForm = Form.create({name: 'login_form'})(NormalLoginForm);

export default LoginForm;