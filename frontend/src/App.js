import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import AppRoutes from "./AppRoutes";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";


const App = () => {
  return (
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
            <LinkContainer to="/signup">
              <Nav.Link >Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link >Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppRoutes></AppRoutes>
    </div>
  );
}

export default App;