import React from 'react';
import { Route, Redirect, useLocation} from 'react-router-dom';
import { StoreState } from '../../rootReducer';
import { useSelector } from 'react-redux';


const AuthenticatedRoute = ({...rest }) => {
    const token = useSelector((state: StoreState) => state.authentication.token);
    const location = useLocation();

    const redirect = <Redirect
        to={{
            pathname: "/login",
            state: { from: location }
        }}
    />;


    return ( token ? <Route {...rest}/> : redirect);
};

export default AuthenticatedRoute;