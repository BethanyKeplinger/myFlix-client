import React from "react";
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';

import './movie-card.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Container id="movie-card-container" fluid="md">
                <Card id="movie-card">
                    <Card.Img id="movie-image"
                        crossOrigin="anonymous"
                        variant="top"
                        src={movie.ImagePath} />

                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>

                        <Link to={`/movies/${movie._id}`}>
                            <Button id="card-button" variant="link">Show more</Button>
                        </Link>

                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired,
};