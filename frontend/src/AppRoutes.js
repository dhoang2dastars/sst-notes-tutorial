import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";


const AppRoutes = () => {
    return(
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="*" element={<NotFound/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route exact path="/notes/new" element={<NewNote/>}></Route>
                <Route exact path="/notes/:id" element={<Notes />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
            </Routes>
    );
}

export default AppRoutes;