import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
    // Add your authentication logic here (e.g., check if a token exists)
    return localStorage.getItem("token") !== null;
};

const ProtectedRoutePage = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
        }
    />
);

export default ProtectedRoutePage;


