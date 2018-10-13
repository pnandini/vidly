import React from 'react';
import {Route} from "react-router-dom";
import authService from "../../services/authService";
import Redirect from "react-router-dom/es/Redirect";

const ProtectedRoute = ({path, component: Component, render, ...rest}) => {
    const user = authService.getUser();
    return (
        <Route {...rest} path={path} render={(props) => {
            if (!user) {
                return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }
            return Component ? <Component {...props}/> : render(props);
        }
        }/>);
};

export default ProtectedRoute;