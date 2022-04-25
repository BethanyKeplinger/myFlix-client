import React from 'react';
import { Form, Button, Col, Row, Card, Container, FormGroup, FormControl } from 'react-bootstrap';

export function UpdatedUser(props) {
    const user = props.userdata
    const { handleSubmit, handleUpdate } = props;

    return (
        <Container>
            <Col>
                <Row>
                    <Card>
                        <Card.Body>
                            <Card.Title>Update Profile</Card.Title>
                            <Form className="update-form" onSubmit={(e) => handleSubmit(e)}>
                                {/* this.editUser(
                                    e,
                                    this.Username,
                                    this.Password,
                                    this.Email,
                                    this.Birthday
                                )} > */}
                                <FormGroup controlId="formUsername">
                                    <Form.Label>Username: </Form.Label>
                                    <FormControl
                                        type="text"
                                        name="Username"
                                        placeholder="New Username"
                                        value={user.Username}
                                        onChange={(e) => handleUpdate(e)}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <FormControl
                                        type="password"
                                        name="Password"
                                        placeholder="New password"
                                        onChange={(e) => handleUpdate(e)}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Form.Label>Email</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="Email"
                                        placeholder="New Email"
                                        value={user.Email}
                                        onChange={(e) => handleUpdate(e)}
                                        required
                                    />
                                </FormGroup>

                                {/* <FormGroup>
                                    <Form.Label>Birthday</Form.Label>
                                    <FormControl
                                        type="date"
                                        name="Birthday"
                                        placeholder="New Birthday"
                                        value={user.Birthday}
                                        onChange={(e) => handleUpdate}
                                        required
                                    />
                                </FormGroup> */}

                                <div>
                                    <Button variant="success" type="submit" onClick={handleSubmit}>Update Info</Button>
                                    {/* <Button variant="secondary" onClick={deleteProfile}>Delete Profile</Button> */}
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>


        </Container>
    )
}