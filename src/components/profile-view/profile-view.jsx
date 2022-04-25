import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';

import { UserData } from './user-data';
import { FavoriteMovies } from './favorite-movies';
import { UpdatedUser } from './update-user';

import './profile-view.scss';
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios';

export function ProfileView(props) {
    const [userdata, setUserdata] = useState({});
    const [updatedUser, setUpdatedUser] = useState({});
    const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);

    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const getUserData = (cancelToken) => {
        axios.get('https://my-flix-2022.herokuapp.com/users/${username}', {
            cancelToken: cancelToken
        })
            .then(response => {
                setUserdata(response.data);
                setUpdatedUser(response.data);
                setFavoriteMoviesList(props.movies.filter(m => response.data.FavoriteMovies.includes(m._id)));
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        let source = axios.CancelToken.source();

        if (token !== null) {
            getUserData(source.token, props.user);
        } else {
            console.log('Not Authorized');
        }

        return () => {
            source.cancel();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('https://my-flix-2022.herokuapp.com/users/${userdata.Username}', updatedUser)
            .then(response => {
                setUserdata(response.data);
                alert('Profile updated');
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handelUpdate = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value
        });
    }

    const deleteProfile = (e) => {
        axios.delete('https://my-flix-2022.herokuapp.com/users/${userdata.Username}')
            .then(response => {
                alert('Profile has been deleted');
                localStorage.removeItem('user');
                localStorage.removeItem('token')

                window.open('/', '_self');
            })
            .catch(e => {
                console.log(e);
            })
    }

    const removeFav = (id) => {
        axios.delete('https://my-flix-2022.herokuapp.com/users/${userdata.Username}/movies/${id}')
            .then(() => {
                //change state of favoritemovielist to render component
                setFavoriteMoviesList(favoriteMoviesList.filter(movie => movie._id != id));
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <Container fluid >
            <Row>
                <Col xs={12} sm={4}>
                    <Card>
                        <Card.Body>
                            <UserData userdata={userdata} />
                        </Card.Body>
                    </Card>

                </Col>

                <Col xs={12} sm={8}>
                    <Card>
                        <Card.Body>
                            <UpdatedUser userdata={userdata} handleSubmit={handleSubmit} handelUpdate={handelUpdate} />
                        </Card.Body>
                    </Card>

                </Col>
            </Row>

            <FavoriteMovies favoriteMoviesList={favoriteMoviesList} removeFav={removeFav} />

        </Container>

    )

}

// export class ProfileView extends React.Component {
//     constructor() {
//         super();

//         this.state = {
//             //Username: null,
//             Password: null,
//             Email: null,
//             Birthday: null,
//             FavoriteMovies: []
//         };
//     }

// componentDidMount() {
//     const accessToken = localStorage.getItem('token');
//     if (accessToken != null) {
//         this.setState({
//             user: localStorage.getItem("user")
//         });
//         this.getUser(accessToken);
//     }
// }

// onLoggedOut() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     this.setState({
//         user: null
//     });
//     window.open('/', '_self');
// }

// getUser(token) {
//     const Username = localStorage.getItem('user');

//     axios.get('https://my-flix-2022.herokuapp.com/users/${Username}', {
//         headers: { Authorization: `Bearer ${token}` }
//     })
//         .then(response => {
//             this.setState({
//                 Username: response.data.Username,
//                 Password: response.data.Password,
//                 Email: response.data.Email,
//                 Birthday: response.data.Birthday,
//                 FavoriteMovies: response.data.FavoriteMovies
//             });
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// editUser = (e) => {
//     e.preventDefault();
//     const Username = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     axios.put('https://my-flix-2022.herokuapp.com/users/${Username}',
//         {
//             Username: this.state.Username,
//             Password: this.state.Password,
//             Email: this.state.Email,
//             Birthday: this.state.Birthday
//         },
//         {
//             headers: { Authorization: `Bearer ${token}` },
//         }
//     )
//         .then((response) => {
//             this.setState({
//                 Username: response.data.Username,
//                 Password: response.data.Password,
//                 Email: response.data.Email,
//                 Birthday: response.data.Birthday
//             });

//             localStorage.setItem('user', this.state.Username);
//             alert("Profile updated!");
//             window.open('/users/${Username}', '_self');
//         });
// };

// onRemoveFavorite = (e, movies) => {
//     e.preventDefault();
//     const Username = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     axios.delete('https://my-flix-2022.herokuapp.com/users/${Username}/movies/${movie._id}',
//         {
//             headers: { Authorization: `Bearer ${token}` }
//         }
//     )
//         .then((response) => {
//             console.log(response);
//             alert("Movie removed");
//             this.componentDidMount();
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// onDeleteUser() {
//     const Username = localStorage.getItem('user');
//     const token = localStorage.getItem('token');

//     axios.delete('https://my-flix-2022.herokuapp.com/users/${Username}', {
//         headers: { Authorization: `Bearer ${token}` }
//     })
//         .then((response) => {
//             console.log(response);
//             alert("Profile deleted");
//             localStorage.removeItem('user');
//             localStorage.removeItem('token');
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// setUsername(value) {
//     this.setState({
//         Username: value
//     });
// }

// setPassword(value) {
//     this.setState({
//         Password: value
//     });
// }

// setEmail(value) {
//     this.setState({
//         Email: value
//     });
// }

// setBirthday(value) {
//     this.setState({
//         Birthday: value
//     });
// }

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