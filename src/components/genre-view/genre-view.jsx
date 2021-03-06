import React from 'react';

import './genre-view.scss';

import { Container, Col, Row, Card, Button } from 'react-bootstrap';

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card id="genre-view">
                            <Card.Body>
                                <Card.Title>{genre.Name}</Card.Title>
                                <Card.Text>
                                    Description: {genre.Description}
                                </Card.Text>
                                <Button id="genre-view-button" onClick={() => { onBackClick(); }}>Back</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}