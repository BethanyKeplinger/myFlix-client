import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    //Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    //validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 4) {
            setUsernameErr('Username must be at least 4 characters long')
            isReq - false;
        }

        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }

        if (!email) {
            setEmailErr('Email Required');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('Please enter a valid email address');
        }

        return isReq
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();

        if (isReq) {
            axios.post('https://my-flix-2022.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Registration successful, please login');
                    window.open('/', '_self');
                })
                .catch(response => {
                    console.error('response');
                    alert('Unable to register');
                });
        }
    };

    return (

        <Container fluid className="registerContainer">

            {/* <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="logout">Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar> */}

            <Row>
                <Col>
                    <CardGroup>
                        <Card className="registerCard">
                            <Card.Body>
                                <Card.Title className="text-center"> Welcome to MyFlix</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>

                                <Form>
                                    <Form.Group controlId="formUsername" className="reg-form-inputs">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            required
                                            placeholder="Enter a username"
                                        />
                                        {values.usernameErr && <p>{values.usernameErr}</p>}

                                    </Form.Group>

                                    <Form.Group controlId="formPassword" className="reg-form-inputs">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                            placeholder="Enter a password with 6 or more characters"
                                            minLength="6"
                                        />
                                        {values.passwordErr && <p>{values.passwordErr}</p>}
                                    </Form.Group>

                                    <Form.Group controlId="formEmail" className="reg-form-inputs">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter a valid email address"
                                        />
                                        {values.emailErr && <p>{values.emailErr}</p>}
                                    </Form.Group>

                                    <Form.Group controlId="updateBirthday">
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={birthday}
                                            onChange={e => setBirthday(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button id="form-button" variant="secondary" type="submit" onClick={handleSubmit}>Register</Button>
                                    <p></p>
                                    <p> Already registered? <Link to={'/'}> Sign in</Link> here</p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>

    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
    //onRegistration: PropTypes.func.isRequired,
};