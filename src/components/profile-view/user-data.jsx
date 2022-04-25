import React from 'react'
import { Col, Row, Card } from 'react-bootstrap';

export function UserData(props) {

    const userdata = props.userdata

    return (
        <Col lg={12}>
            <Row>
                <Card>
                    <Card.Title> Profile Page</Card.Title>
                    <Card.Body>
                        <p>Name: {userdata.Username}</p>
                        <p>E-mail: {userdata.Email}</p>
                        <p>Birthday: {userdata.Birthday}</p>
                    </Card.Body>
                </Card>
            </Row>
        </Col>
    )
}