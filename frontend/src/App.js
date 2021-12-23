import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import AppRoutes from "./AppRoutes";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import { AppContext } from "./lib/contextLib";
import {Auth} from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { onError } from "./lib/errorLib";


const App = () => {
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  useEffect(()=> {onLoad();})

  async function onLoad() {
    try{
      await Auth.currentSession();

      userHasAuthenticated(true);
    } catch(e) {
      if(e !== 'No current user'){
        onError(e);
      }
    }
    console.log('balls', isAuthenticated)
    setIsAuthenticating(false);
  }
  //TODO: fix the redirect showing in the URl after logging out when viewing a note 
  async function handleLogout() {
    
    await Auth.signOut();
    userHasAuthenticated(false);
    navigate("/login");
  }
  return (
    !isAuthenticating && (    
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Scratch
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
          {isAuthenticated ? (
            <>
              <LinkContainer to="/settings">
                  <Nav.Link>Settings</Nav.Link>
              </LinkContainer>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value = {{isAuthenticated, userHasAuthenticated}}>
        <AppRoutes></AppRoutes>
      </AppContext.Provider>
    </div>)
  );
}

export default App;