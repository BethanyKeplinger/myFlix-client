import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

import './profile-view.scss';
import { Container, Card, Button, Row, Col, Form, FormGroup, FormControl } from 'react-bootstrap'
import axios from 'axios';

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            //Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        if (accessToken != null) {
            this.setState({
                user: localStorage.getItem("user")
            });
            this.getUser(accessToken);
        }
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
        window.open('/', '_self');
    }

    getUser(token) {
        const Username = localStorage.getItem('user');

        axios.get('https://my-flix-2022.herokuapp.com/users/${Username}', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
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

        axios.put('https://my-flix-2022.herokuapp.com/users/${Username}',
            {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday
            },
            {
                headers: { Authorization: `Bearer ${token}` },
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
                alert("Profile updated!");
                window.open('/users/${Username}', '_self');
            });
    };

    onRemoveFavorite = (e, movies) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete('https://my-flix-2022.herokuapp.com/users/${Username}/movies/${movie._id}',
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then((response) => {
                console.log(response);
                alert("Movie removed");
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onDeleteUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete('https://my-flix-2022.herokuapp.com/users/${Username}', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log(response);
                alert("Profile deleted");
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
        //const { movies, onBackClick } = this.props;
        const { FavoriteMovies, Username, Email, Birthday } = this.state;

        if (!Username) {
            return null;
        }

        return (
            <Container>
                <Row>
                    <Col xs={12} sm={4}>
                        <Card>
                            <Card.Body>
                                <UserInfo name={user.Username} emai={user.Email} />
                            </Card.Body>
                        </Card>

                    </Col>

                    <Col xs={12} sm={8}>
                        <Card>
                            <Card.Body>
                                <UpdateUser />
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>

                <FavoriteMovies />

            </Container>
        )
    }
}

ProfileView.propTypes = {
    // movies: PropTypes.arrayOf(PropTypes.shape({
    //     Title: PropTypes.string.isRequired,
    // //     Description: PropTypes.string.isRequired,
    // //     ImagePath: PropTypes.string.isRequired,
    // //     Genre: PropTypes.shape({
    // //         Name: PropTypes.string.isRequired,
    // //         Description: PropTypes.string.isRequired,
    // //     }).isRequired,
    // //     Director: PropTypes.shape({
    // //         Bio: PropTypes.string.isRequired,
    // //         Birth: PropTypes.string.isRequired,
    // //         Name: PropTypes.string.isRequired,
    // //     }).isRequired,
    // // })).isRequired,
    // onBackClick: PropTypes.func.isRequired
}