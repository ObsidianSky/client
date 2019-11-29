import React from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { bindActionCreators } from 'redux';
import { StoreState } from '../../rootReducer';

export default function authenticationRequiredHOC(ComposedComponent) {
    class Authenticate extends React.Component<{ isAuthenticated: boolean, redirect: Function}> {
        componentDidMount() {
            this.checkAndRedirect();
        }

        componentDidUpdate() {
            this.checkAndRedirect();
        }

        checkAndRedirect() {
            const { isAuthenticated, redirect } = this.props;

            if (!isAuthenticated) {
                redirect();
            }
        }

        render() {
            return (
                <div>
                    { this.props.isAuthenticated ? <ComposedComponent {...this.props} /> : null }
                </div>
            );
        }
    }

    const mapStateToProps = (state: StoreState) => {
        return {
            isAuthenticated: state.authentication.token
        };
    };

    const mapDispatchToProps = dispatch => bindActionCreators({
        redirect: () => push('/login')
    }, dispatch);

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Authenticate);
}