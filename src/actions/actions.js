//declare action types and variables 
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_GENRE = 'SET_GENRE';
export const SET_DIRECTOR = 'SET_DIRECTOR';
export const SET_USER = 'SET_USER';
export const SET_FAVORITES = 'SET_FAVORITES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

//initializes the movies list with movies 
export function setMovies(value) {
    console.log('SET_MOVIES action trigger');
    return {
        type: SET_MOVIES,
        value
    };
}

//sets filter to filter movies 
export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    };
}

export function setDirector(value) {
    return {
        type: SET_DIRECTOR,
        value
    };
}

export function setGenre(value) {
    return {
        type: SET_GENRE,
        value
    };
}

export function setUser(value) {
    return {
        type: SET_USER,
        value
    };
}

export function setFavorites(value) {
    return {
        type: SET_FAVORITES,
        value
    };
}

export function addFavorite(value) {
    return {
        type: ADD_FAVORITE,
        value
    };
}

export function removeFavorite(value) {
    return {
        type: REMOVE_FAVORITE,
        value
    };
}