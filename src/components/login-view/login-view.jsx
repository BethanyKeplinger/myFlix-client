import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./login-view.scss"

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
        const isReq = validate();

        if (isReq) {
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
    };

    return (

        <Container fluid className="loginContainer">

            <Row>
                <Col>
                    <CardGroup>
                        <Card id="login-card">
                            <Card.Body>
                                <Card.Title className="text-center"> Welcome to MyFlix</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted text-center">Please Login</Card.Subtitle>

                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" value={username}
                                            onChange={e => setUsername(e.target.value)} />
                                        {/*code added here to display validation error*/}
                                        {usernameErr && <p>{usernameErr}</p>}
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" placeholder="Enter Password" value={password}
                                            onChange={e => setPassword(e.target.value)} />
                                        {/*code added here to display validation error*/}
                                        {passwordErr && <p>{passwordErr}</p>}
                                    </Form.Group>

                                    <Button id="login-button" variant="primary" type="submit" onClick={handleSubmit}>Login
                                    </Button>

                                </Form>


                                <Card.Text> Not Registered yet?</Card.Text>
                                <div id="register-container">
                                    <Link to="/register">
                                        <Button id="register-button">Register Now </Button>
                                    </Link>
                                </div>

                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
    }),
    //onLoggedIn: PropTypes.func.isRequired
};