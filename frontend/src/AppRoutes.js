import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";


const AppRoutes = () => {
    return(
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
    );
}

export default AppRoutes;