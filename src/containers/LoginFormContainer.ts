import { connect } from 'react-redux'
import LoginForm, { LoginFormOutput, LoginFormProps } from "../components/login-form/LoginForm";
import { userLogInAction } from '../features/user/user.actions';
import { StoreState } from '../rootReducer';

const mapProps = (state: StoreState): Partial<LoginFormProps> => ({
    loading: state.user.pending,
    errorMessage: state.user.errorMessage
});

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginSubmit: (data: LoginFormOutput) => {
            dispatch(userLogInAction(data))
        }
    }
};

const LoginFormContainer = connect(
    mapProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer