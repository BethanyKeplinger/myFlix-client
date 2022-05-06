import React from 'react';
//import './navbar-view.scss';

import { Navbar, Container, Nav, Button } from 'react-bootstrap';

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
            <Container id="navbar-container">
                <Navbar.Brand id="navbar-logo" href="/">MyFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link id="nav-link" href="/">Home</Nav.Link>
                        )}
                        {isAuth() && (
                            <Nav.Link id="nav-link" href={`/users/${user}`}>{user}</Nav.Link>
                        )}
                        {isAuth() && (
                            <Button id="logout-button" variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link id="nav-link" href="/">Sign-in</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link id="nav-link" href="/register">Sign-up</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}