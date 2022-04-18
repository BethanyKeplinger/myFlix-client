import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card id="movie-view">
                            <Card.Body>
                                <Card.Img id="movie-view-image" variant="top" src={movie.ImagePath} />
                                <Card.Title id="movie-title" className="movie-title">{movie.Title}</Card.Title>
                                <Card.Text id="movie-description" className="movie-description">{movie.Description}</Card.Text>
                                <Card.Text id="movie-director" className="movie-director">Director: {movie.Director.Name}</Card.Text>
                                <Card.Text id="movie-genre" className="movie.genre">Genre: {movie.Genre.Name}</Card.Text>
                            </Card.Body>
                        </Card>

                        <Button id="movie-view-button" onClick={() => { onBackClick(null); }}>Back</Button>
                        <Button id="movie-viewbutton" onClick={() => { }}>Add to favorites</Button>

                    </Col>
                </Row>
            </Container>
        );
    }
}