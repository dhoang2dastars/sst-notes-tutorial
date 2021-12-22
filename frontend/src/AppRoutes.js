import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";


const AppRoutes = () => {
    return(
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="*" element={<NotFound/>}></Route>
                <Route path="/login" element={<UnauthenticatedRoute> <Login /> </UnauthenticatedRoute>}></Route>
                <Route path="/signup" element={<UnauthenticatedRoute> <Signup /> </UnauthenticatedRoute>}></Route>
                <Route exact path="/notes/new" element={<AuthenticatedRoute> <NewNote/> </AuthenticatedRoute>}></Route>
                <Route exact path="/notes/:id" element={<AuthenticatedRoute> <Notes /> </AuthenticatedRoute>}></Route>
                <Route path="/settings" element={<AuthenticatedRoute><Settings /></AuthenticatedRoute>}></Route>
            </Routes>
    );
}

export default AppRoutes;