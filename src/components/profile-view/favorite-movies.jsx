import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Button, Container } from 'react-bootstrap';

export function FavoriteMovies({ favoriteMoviesList, removeFav }) {
    return (
        <Container>

            <Row>
                <Col xs={12}>
                    <h4>Favorite Movies</h4>
                </Col>
            </Row>
            <Row>
                {favoriteMoviesList.map(movie => {
                    return (
                        <Col xs={12} md={6} key={_id}>
                            <Card className="favorite-movie">
                                <Card.Img variant="top" crossOrigin="anonymous" src={movie.ImagePath} />
                                <Card.Body>
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <Button onClick={() => removeFav(movie._id)}>Remove from Favorites</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })
                }
                {/* <Col>
                <Card>
                    <Card.Body>
                        {FavoriteMovies.length === 0 && (
                            <div className="text-center"> No Favorite Movies</div>
                        )}
                        <Row className="favorite-movies-container">
                            {FavoriteMovies.length > 0 && movies.map((movie) => {
                                if (movie._id === FavoriteMovies.find((fav) => fav === movie._id)
                                ) {
                                    return (
                                        <Card className="favorite-movie" key={movie._id} >
                                            <Card.Img
                                                className="favorite-movie-image"
                                                variant="top"
                                                src={movie.ImagePath}
                                            />
                                            <Card.Body>
                                                <Card.Title className="movie-title">
                                                    {movie.Title}
                                                </Card.Title>
                                                <Button value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove from List</Button>
                                            </Card.Body>
                                        </Card>
                                    );
                                }
                            })}
                        </Row>
                    </Card.Body>
                </Card>
            </Col> */}
            </Row>
        </Container>
    )
}