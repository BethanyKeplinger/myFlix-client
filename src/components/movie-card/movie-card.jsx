import React from "react";
import PropTypes from 'prop-types';
import { Button, Card, Container, CardGroup } from "react-bootstrap";
import "./movie-card.scss"

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
            <Container id="movie-card">
                <CardGroup id="movie-card" >
                    <Card>
                        <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
                        <Card.Body>
                            <Card.Title>{movie.Title}</Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>
                            <Button onClick={() => onMovieClick(movie)} variant="link">Show more</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Container>

        )
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};