import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card id="movie-view">
                            <Card.Body>
                                <Card.Img crossOrigin="anonymous" id="movie-view-image" variant="top" src={movie.ImagePath} />
                                <Card.Title id="movie-title" className="movie-title">{movie.Title}</Card.Title>
                                <Card.Text id="movie-description" className="movie-description">{movie.Description}</Card.Text>
                                {/* <Card.Text id="movie-director" className="movie-director">Director: {movie.Director.Name}</Card.Text>
                                <Card.Text id="movie-genre" className="movie.genre">Genre: {movie.Genre.Name}</Card.Text> */}

                                <Link to={`/director/${movie.Director.Name}`}>
                                    <Button variant="link" id="movie-director" className="movie-director">
                                        Director: {movie.Director.Name}</Button>
                                </Link>
                                <Link to={`/genre/${movie.Genre.Name}`}>
                                    <Button variant="link" id="movie-genre" className="movie-gerne">
                                        Genre: {movie.Genre.Name}</Button>
                                </Link>
                            </Card.Body>
                        </Card>

                        <Button id="movie-view-button" onClick={() => { onBackClick(null); }}>Back</Button>
                        <Button id="movie-view-button" onClick={() => { }}>Add to favorites</Button>

                    </Col>
                </Row>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        // Description: PropTypes.string.isRequired,
        // Genre: PropTypes.shape({
        //     Name: PropTypes.string.isRequired,
        //     Description: PropTypes.string.isRequired
        // }),
        // Director: PropTypes.shape({
        //     Name: PropTypes.string.isRequired,
        //     Bio: PropTypes.string.isRequired,
        //     Birth: PropTypes.string.isRequired
        // }),
        ImagePath: PropTypes.string.isRequired
    }).isRequired
};