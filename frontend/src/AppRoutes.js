import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";


const AppRoutes = () => {
    return(
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="*" element={<NotFound/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
    );
}

export default AppRoutes;