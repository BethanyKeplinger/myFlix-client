import React, { startTransition } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import {
    setMovies,
    setGenre,
    setDirector,
    setUser,
    setFavorites,
} from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

//import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar-view/navbar-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import { Container, Row, Col } from 'react-bootstrap';

//export keyword has been removed
class MainView extends React.Component {

    constructor() {
        super();
        //Initial state is set to null  
        this.state = {
            user: null
        };
    }

    componentDidMount() {

        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    /* when a user successfully logs in, this function updates the `user` property in state to that particular user */
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    getMovies(token) {
        axios.get('https://my-flix-2022.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                //Assign the result to the state    
                this.props.setMovies(response.data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        let { movies } = this.props;
        let { user } = this.state;


        return (

            <Router>

                {/* <Button id="logout-button" onClick={() => { this.onLoggedOut() }}>Logout</Button> */}
                <Row>
                    <NavbarView user={user} />
                </Row>


                <Container>

                    <Row className='main-view'>
                        <Route exact path="/" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            //Before the movies have been loaded
                            if (movies.length === 0) return <div className="main-view" />;

                            return <MoviesList movies={movies} />;
                        }} />

                        <Route path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return <Col lg={8} md={8}>
                                <RegistrationView />
                            </Col>
                        }} />

                        <Route exact path="/movies/:movieId" render={({ match, history }) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;

                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        <Route exact path="/director/:name" render={({ match, history }) => {
                            if (!user) {
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            }

                            if (movies.length === 0) {
                                return <div className="main-view" />;
                            }

                            return <Col md={8}>
                                <DirectorView
                                    director={movies.find(m => m.Director.Name === match.params.name).Director}
                                    onBackClick={() => history.goBack()}
                                    movies={movies.find(m => m.Director.Name === match.params.name).Director} />
                            </Col>
                        }} />

                        <Route exact path="/genre/:name" render={({ match, history }) => {
                            if (!user) {
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            }

                            if (movies.length === 0) {
                                return <div className="main-view" />;
                            }

                            return (
                                <Col md={8}>
                                    <GenreView
                                        genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                                        onBackClick={() => history.goBack()}
                                        movie={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                                </Col>
                            );
                        }} />

                        <Route path="/users/:Username" render={({ history }) => {
                            if (!user) {
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            }

                            return (
                                <Col md={8}>
                                    <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                                </Col>
                            );
                        }} />

                        {/* <Route exact path="/users/:Username"
                            render={({ match, history }) => {
                                if (!user)
                                    return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                if (movies.length === 0) return <div className="main-view" />
                                return <Col>
                                    <ProfileView history={history} movies={movies} user={user} />
                                    // onBackClick={() => history.goBack} />
                                </Col>
                            }} /> */}

                        {/* <Route path={`/user-update/${user}`} render={({ match, history }) => {
                            if (!user) return <Redirect to="/" />
                            return <Col>
                                <UserUpdate user={user} onBackClick={() => history.goBack()} />
                            </Col>
                        }} /> */}
                    </Row>
                </Container>
            </Router >

        );
    }
}

let mapStateToProps = (state) => ({
    movies: state.movies,
    user: state.user,
    favorites: state.favoritres,
    genre: state.genre,
    director: state.director
});

export default connect(mapStateToProps, {
    setMovies,
    setDirector,
    setGenre,
    setUser,
    setFavorites,
})(MainView);
