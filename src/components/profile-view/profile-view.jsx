import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';

import './profile-view.scss';
import axios from 'axios';

export function ProfileView({ movies, onUpdatedUserInfo }) {
    const [user, setUser] = useState({
    })

    const favoriteMovieList = movies.filter((movies) => {

    })

    const getUser = () => {

    }

    const handleSubmit = (e) => {

    }

    const removeFav = (id) => {

    }

    const handleUpdate = (e) => {

    }

    useEffect(() => {

    }, [])

    return (
        <div>
            <UserInfo name={user.Username} email={user.Email} />

            <FavoriteMovies favoriteMovieList={favoriteMovieList}
            

            <Form>

            </Form>
        </div>
    )
}