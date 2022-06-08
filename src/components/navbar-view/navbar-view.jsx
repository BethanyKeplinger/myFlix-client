import React from 'react';
//import './navbar-view.scss';

import { Navbar, Container, Nav, Button, Form, FormControl } from 'react-bootstrap';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

export function NavbarView({ user }) {

    const onLoggedOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (
        <Navbar id="navbar" fixed="top" expand="lg" bg="dark" variant="dark">
            <Container fluid id="navbar-container">
                <Navbar.Brand id="navbar-logo" href="/">MyFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {isAuth() && (
                            <Nav.Link id="nav-link" href="/">Home</Nav.Link>
                        )}
                        {isAuth() && (
                            <Nav.Link id="nav-link" href={`/users/${user}`}>{user}</Nav.Link>
                        )}
                        {isAuth() && (
                            <Button id="logout-button" variant="outline-light" size="sm" onClick={() => { onLoggedOut() }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link id="nav-link" href="/">Sign-in</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link id="nav-link" href="/register">Sign-up</Nav.Link>
                        )}
                    </Nav>
                    {isAuth() && (
                        <Form id="search-bar" className="d-flex ml-auto">

                            <FormControl
                                type="search"
                                placeholder="Search movies here"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button id="search-button" variant="outline-light" size="sm">Search</Button>
                        </Form>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    );
}