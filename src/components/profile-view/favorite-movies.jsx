import React from 'react'

function FavoriteMovies() {
    return (
        <Row>
            <Col>
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
            </Col>
        </Row>
    )
}

export default FavoriteMovies