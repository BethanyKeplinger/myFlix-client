import React from 'react';

//import './director-view.scss';

import { Container, Row, Col, Card, Button, Cardgroup } from 'react-bootstrap';

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card id="director-view">
                            <Card.Body>
                                <Card.Title>{director.Name}</Card.Title>
                                <Card.Text>
                                    Bio: {director.Bio}
                                </Card.Text>
                                <Card.Text>
                                    Birthday: {director.Birth}
                                </Card.Text>
                                <Button id="director-back-button" onClick={() => { onBackClick(); }}>Back</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}