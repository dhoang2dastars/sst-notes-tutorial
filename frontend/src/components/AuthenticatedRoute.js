import React from "react";
import { Route, useLocation, Navigate} from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

//Route for fully authenticated users
const AuthenticatedRoute = ({children, ...rest}) => {
    const  {location,pathname, search} = useLocation();
    const {isAuthenticated } = useAppContext();
    return (
        // <Route {...rest}>
        //     {isAuthenticated? (children) : 
        //                         (<Navigate to={`/login?redirect=${pathname}${search}`} />)}
        // </Route>
        <div>
        {console.log(location)}
            {isAuthenticated ? (children) : (<Navigate to={`/login?redirect=${pathname}${search}`} state={{ from: location }} />)}
        </div>
    )
}

export default AuthenticatedRoute;