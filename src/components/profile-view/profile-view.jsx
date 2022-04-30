import React from 'react';

import './profile-view.scss';
import PropTypes from 'prop-types';

import { Container, Card, Button, Row, Col, Form, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: []
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken != null) {
            this.setState({
                user: localStorage.getItem('user')
            });
        }
        this.getUser(accessToken);
    }

    // onLoggedOut() {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    //     this.setState({
    //         user: null
    //     });
    //     window.open('/', '_self');
    // }

    getUser(token) {
        let Username = localStorage.getItem('user');

        axios.get(`https://my-flix-2022.herokuapp.com/users/${Username}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            })

            .then(response => {
                //assign the result to the state
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    editUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://my-flix-2022.herokuapp.com/users/${Username}`,
            {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday
                });

                localStorage.setItem('user', this.state.Username);
                alert('Profile has been updated!');
                window.open('/', '_self');
            });
    };

    onRemoveFav = (e, movie) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://my-flix-2022.herokuapp.com/users/${Username}/movies/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then((response) => {
                console.log(response);
                alert('Movie has been removed');
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onDeleteProfile() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://my-flix-2022.herokuapp.com/users/${Username}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                console.log(response);
                alert('Profile has been deleted');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setUsername(value) {
        this.setState({
            Username: value
        });
    }

    setPassword(value) {
        this.setState({
            Password: value
        });
    }

    setEmail(value) {
        this.setState({
            Email: value
        });
    }

    setBirthday(value) {
        this.setState({
            Birthday: value
        });
    }

    render() {
        const { movies } = this.props;
        const { Username, Email, Birthday, Password, FavoriteMovies } = this.state;

        if (!Username) {
            return null;
        }

        return (
            <Container id='profile-container'>
                <Row>
                    <Col>
                        <Card id="update-profile-container">
                            <Card.Body>
                                <Card.Title>Update Profile</Card.Title>
                                <Form className='update-form' onSubmit={(e) =>
                                    this.editUser(
                                        e,
                                        this.Username,
                                        this.Password,
                                        this.Email,
                                        this.Birthday
                                    )} >

                                    <FormGroup controlId='formUsername'>
                                        <Form.Label>Username: </Form.Label>
                                        <FormControl
                                            type='text'
                                            name='Username'
                                            placeholder='New Username'
                                            value={Username}
                                            onChange={(e) => this.setUsername(e.target.value)}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup controlId='formPassword'>
                                        <Form.Label>Password:</Form.Label>
                                        <FormControl
                                            type='password'
                                            name='Password'
                                            placeholder='New password'
                                            defaultValue=""
                                            onChange={(e) => this.setPassword(e.target.value)}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Form.Label>Email</Form.Label>
                                        <FormControl
                                            type='email'
                                            name='Email'
                                            placeholder='Enter new Email'
                                            value={Email}
                                            onChange={(e) => this.setEmail(e.target.value)}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Form.Label>Birthday</Form.Label>
                                        <FormControl
                                            type='date'
                                            name='Birthday'
                                            placeholder='Update Birthday'
                                            value={Birthday}
                                            onChange={(e) => this.setBirthday(e.target.value)}
                                            required
                                        />
                                    </FormGroup>

                                    <div>
                                        <Button id='update-button' type='submit' onClick={this.editUser}>Update Info</Button>
                                        <Button id='delete-button' onClick={() => this.onDeleteProfile()}> Delete Profile</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Row>
                        <Col>
                            <Card id="profile-movies-card">
                                <Card.Body>
                                    {FavoriteMovies.length === 0 && (
                                        <div className='text-center'> No Favorite Movies</div>
                                    )}

                                    <Row className='favorite-movies-container'>
                                        {FavoriteMovies.length > 0 && movies.map((movie) => {
                                            if (movie._id === FavoriteMovies.find((fav) => fav === movie._id)
                                            ) {
                                                return (
                                                    <Col key={movie._id}>
                                                        <Card className='favorite-movie' key={movie._id}>
                                                            <Card.Img variant='top' crossOrigin='anonymous' src={movie.ImagePath} />
                                                            <Card.Body>
                                                                <Card.Title>{movie.Title}</Card.Title>
                                                                <Button id='remove-button' value={movie._id} onClick={(e) => this.onRemoveFav(e, movie)}>Remove from Favorites</Button>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                );
                                            }
                                        })}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Row>
            </Container>
        )
    }
}

ProfileView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired,
        Director: PropTypes.shape({
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
        }).isRequired,
    })).isRequired,
};