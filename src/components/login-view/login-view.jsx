import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
<<<<<<< Updated upstream
=======
import "./login-view.scss";

import axios from 'axios';
>>>>>>> Stashed changes

import axios from 'axios';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    //validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 4) {
            setUsernameErr('Username must be at least 4 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
<<<<<<< Updated upstream
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
=======
        const isReq = validate();
        if (isReq) {
            /*Send a request to the server for authentication*/
            axios.post('https://my-flix-2022.herokuapp.com/login', {
                Username: username,
                Password: password
            })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch(e => {
                    console.log('no such user')
                });
        }
>>>>>>> Stashed changes
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
                                        {/*code added here to display validation error*/}
                                        {usernameErr && <p> {usernameErr}</p>}
                                    </Form.Group>

<<<<<<< Updated upstream
                                    <Form.Group controlId="formUsername">
                                        <Form.label>Password:</Form.label>
                                        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
=======
                                    <Form.Group controlId="formPassword">
                                        <Form.Label className="form-element">Password:</Form.Label>
                                        <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
                                        {/*code added here to display validation error*/}
                                        {passwordErr && <p>{passwordErr}</p>}
>>>>>>> Stashed changes
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
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired
};