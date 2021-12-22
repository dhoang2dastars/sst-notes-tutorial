import React, { cloneElement } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";
//---------------------------------------------

function querystring(name, url = window.location.href) {
    const parsedName = name.replace(/[[]]/g, "\\$&");
    const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");
    const results = regex.exec(url);
  
    if (!results || !results[2]) {
      return false;
    }
  
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function UnauthenticatedRoute(props) {
    const redirect = querystring("redirect");


    const { children, ...rest } = props;
    const { isAuthenticated } = useAppContext();

    return (
        <div>
        {console.log(props)}
        {console.log(children)}
        {!isAuthenticated ? (
            props.children
        ) : (
            (<Navigate to={ redirect ? redirect : "/"} />)
        )}
        </div>
    );
}