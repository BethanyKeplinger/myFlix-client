import { combineReducers } from "redux";

import {
    SET_FILTER,
    SET_MOVIES,
    SET_GENRE,
    SET_DIRECTOR,
    SET_USER,
    SET_FAVORITES,
    ADD_FAVORITE,
    REMOVE_FAVORITE
} from "../actions/actions";

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}
//more general name because it will be used with other functions
function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            console.log('SET_MOVIES reducer reached')
            return action.value;
        default:
            return state;
    }
}

function genre(state = [], action) {
    switch (action.type) {
        case SET_GENRE:
            console.log('SET_GENRE reducer reached')
            return action.value;
        default:
            return state;
    }
}

function director(state = [], action) {
    switch (action.type) {
        case SET_DIRECTOR:
            console.log('SET_DIRECTOR reducer reached')
            return action.value;
        default:
            return state;
    }
}

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            console.log('SET_USER reducer reached')
            return action.value;
        default:
            return state;
    }
}

function favorites(state = [], action) {
    switch (action.type) {
        case SET_FAVORITES:
            console.log('SET_FAVORITES reducer reached')
            return [...action.value];
        case ADD_FAVORITE:
            console.log('ADD_FAVORITE reducer reached')
            return [...state, action.value];
        case REMOVE_FAVORITE:
            console.log('REMOVE_FAVORITE reducer reached')
            return state.filter((id) => id !== action.value);
        default:
            return state;
    }
}



const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    genre,
    director,
    user,
    favorites

});

export default moviesApp