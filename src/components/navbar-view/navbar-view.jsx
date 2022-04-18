import React from 'react';
import './navbar-view.scss';

import { Navbar, Container, Nav } from 'react-bootstrap';

export function NavbarView({ user }) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    return (
        <Navbar bg="dark" variant="dark" id="navbar" fixed="top">
            <Container id="navbar-container">
                <Navbar.Brand id="navbar-brand" href="#">MyFlix</Navbar.Brand>
                <Nav id="id" className="me-auto">
                    <Nav.Link id="nav-link" href="#home">Account</Nav.Link>
                    <Nav.Link id="nav-link" href="#myfavoritemovies">Watchlist</Nav.Link>
                    <Nav.Link id="nav-link" href="#register">Register</Nav.Link>
                    <Nav.Link id="nav-link" href="#logout">Log Out</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}