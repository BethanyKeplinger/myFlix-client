import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
<<<<<<< Updated upstream
=======
import "./login-view.scss";

import axios from 'axios';
>>>>>>> Stashed changes

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://my-flix-2022.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            /*console.log(username, password);*/
            /*Send a request to the server for aunthentication */
            /*the call props.onLoggedIn(username) */
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };

    return (
        <Container fluid className="loginContainer">

            <Navbar bg="navColor" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="login">Login</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Row>
                <Col>
                    <CardGroup>
                        <Card className="loginCard">
                            <Card.Body>
                                <Card.Title className="text-center"> Welcome to MyFlix</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted text-center">Please Login</Card.Subtitle>

                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group controlId="formUsername">
                                        <Form.label>Password:</Form.label>
                                        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" onClick={handleSubmit}>Login
                                    </Button>

                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};