import React from 'react';

function UpdateUser() {
    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Profile</Card.Title>
                            <Form className="updateform" onSubmit={(e) =>
                                this.editUser(
                                    e,
                                    this.Username,
                                    this.Password,
                                    this.Email,
                                    this.Birthday
                                )} >
                                <FormGroup>
                                    <Form.Label>Username</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="Username"
                                        placeholder="New Username"
                                        value={Username}
                                        onChange={(e) => this.setUsername(e.target.value)}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Form.Label>Password</Form.Label>
                                    <FormControl
                                        type="password"
                                        name="Password"
                                        placeholder="New password"
                                        value=""
                                        onChange={(e) => this.setPassword(e.target.value)}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Form.Label>Email</Form.Label>
                                    <FormControl
                                        type="email"
                                        name="Email"
                                        placeholder="New Email"
                                        value={Email}
                                        onChange={(e) => this.setEmail(e.target.value)}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Form.Label>Birthday</Form.Label>
                                    <FormControl
                                        type="date"
                                        name="Birthday"
                                        placeholder="New Birthday"
                                        value={Birthday}
                                        onChange={(e) => this.setBirthday(e.target.value)}
                                        required
                                    />
                                </FormGroup>

                                <div>
                                    <Button variant="success" type="submit" onClick={this.editUser}>Update Info</Button>
                                    <Button variant="secondary" onClick={() => this.onDeleteUser()}>Delete Profile</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </Container>
    )
}

export default UpdateUser